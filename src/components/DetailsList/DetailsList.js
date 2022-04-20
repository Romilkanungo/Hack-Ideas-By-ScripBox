import React, {useState, useEffect} from 'react';
import './DetailsList.css'

function DetailsList(props) {

  const [details, setDetails] = useState([]);
  const [sortedDetails, setSortedDetails] = useState([]);
  const [showDelete, setDelete] = useState(false);

  
  useEffect ( () => {
    fetchDetails(props.detailOf);
    setDelete(false);
  },[props.detailOf]);

  // This function would be used to initially get all the ideas and challanges from the json server
  const fetchDetails = (detailOf) => {
    if(detailOf === 'Challanges'){
      fetch('http://localhost:8000/challenges')
        .then( response => {
          return response.json();
        })
        .then( (details) => {
          setDetails(details);
          setSortedDetails(details);
        });
    }
    else if(detailOf === 'Ideas'){
      fetch('http://localhost:8000/ideas')
        .then( response => {
          return response.json();
        })
        .then( (details) => {
          setDetails(details);
          setSortedDetails(details);
        });
    }
  }

  // This function is used to filter the data according to the search input
  const searchData = () => {
    let searchInputValue = document.getElementById('searchInput').value;
    if(searchInputValue){
      let searchedDetails = details.filter((detail, index)=>{
        return (detail.title.toLowerCase().includes(searchInputValue.toLowerCase()) || detail.description.toLowerCase().includes(searchInputValue.toLowerCase()))
      })
      setSortedDetails(searchedDetails);
    }
    else{
      setSortedDetails(details);
    }
    setDelete(false);
  }

  // This function will be used to sort the details by vote count of date creation
  const sortDetails =(e) => {
    if(e.target.value && e.target.value === 'votes'){
      if(props.detailOf === 'Challanges'){
        fetch('http://localhost:8000/challenges?_sort=votes&_order=aesc')
        .then( response => {
          return response.json();
        })
        .then( (details) => {
          setSortedDetails(details);
        });
      }
      else if(props.detailOf === 'Ideas'){
        fetch('http://localhost:8000/ideas?_sort=votes')
        .then( response => {
          return response.json();
        })
        .then( (details) => {
          setSortedDetails(details);
        });
      }
    }
    else if(e.target.value && e.target.value === 'date'){
      if(props.detailOf === 'Challanges'){
        fetch('http://localhost:8000/challenges?_sort=date')
        .then( response => {
          return response.json();
        })
        .then( (details) => {
          setSortedDetails(details);
        });
      }
      else if(props.detailOf === 'Ideas'){
        fetch('http://localhost:8000/ideas?_sort=date')
        .then( response => {
          return response.json();
        })
        .then( (details) => {
          setSortedDetails(details);
        });
      }
    }
    else{
      setSortedDetails(details);
    }
    setDelete(false);
  }

  // This function will be used to get all the deatils listed by the logged in user
  const getMyListings = () =>{
    let searchedDetails = details.filter((detail, index)=>{
      return (detail.createdBy === Number(props.userId))
    })
    setSortedDetails(searchedDetails);
    setDelete(true);
  }

  // This function wil take us to the add details page
  const addNewDeatils = () => {
    window.location.replace('/add');
  }

  // This function will be used to upvote a details
  const upVoteDetail = (e, detail) => {

    let detailToUpdate = {...detail};
    detailToUpdate.votes +=1;

    if(props.detailOf === 'Challanges'){
      fetch('http://localhost:8000/challenges/'+ detail.id, {
            method: 'PUT',
            headers: { 
                'Accept': 'application/json',
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify(detailToUpdate)
        })
    }
    else if( props.detailOf === 'Ideas'){
        fetch('http://localhost:8000/ideas/' + detail.id, {
          method: 'PUT',
          headers: { 
              'Accept': 'application/json',
              'Content-Type': 'application/json' 
          },
          body: JSON.stringify(detailToUpdate)
        })
    }
    fetchDetails(props.detailOf);  
  }

  // This function will be used to delete the idea/challanges 
  const deleteDetail = (e, detail) => {
    if(props.detailOf === 'Challanges'){
      fetch('http://localhost:8000/challenges/'+ detail.id, {
          method: 'DELETE',
      })
    }
    else if( props.detailOf === 'Ideas'){
        fetch('http://localhost:8000/ideas/' + detail.id, {
            method: 'DELETE',
        })
    }
    //getMyListings();
    window.location.replace('/home');
  }

  // This function will be triggered when Back button is clicked and will show all the listings
  const getAllListings = () => {
    setSortedDetails(details);
    setDelete(false);
  }

  // This function will be used to handle the enter keyword press
  const handleSearchKeypress = (e) => {
    if (e.key === "Enter") {
      searchData();
    }
  };

    return (
      <div className='DetailsList__Wrapper'>
        <div className='DetailsList__SearchSort'>
          <div className='DetailsList__Search'>
            <input id='searchInput' type='text'onKeyPress={handleSearchKeypress} />
            <button id='searchButton' onClick={searchData}> Go </button>
          </div>
          <div className='DetailsList__Sort'>
              <label>Sort By:</label>
              <select name="sortBy" id="sortDetails" onChange={(e)=>sortDetails(e)}>
                <option value=""></option>
                <option value="votes">Votes</option>
                <option value="date">Date</option>
              </select>
          </div>
          
        </div>
        {
          sortedDetails.map( (detail,index) => {
            let dateFormatted =new Date(detail.date).toString().slice(0,25); 
            return(
              <div key={index} className='SingleDetail__Conatiner'>
                
                <div className='SingleDetail_TitleDelete'>
                  <div className='SingleDetail_Title'>{detail.title}</div> 
                  <button className='SingleDetail_Delete' style={{display: showDelete ? 'block' : 'none'}} onClick={(e) => {deleteDetail(e,detail)}}> Delete </button>
                </div>
                <div className='SingleDetail_Description'> <strong> Description :  </strong>{detail.description}</div>
                <div className='SingleDetail_DateAuthor'>
                  <div className='SingleDetail_Date'><strong> Create On:</strong>  {dateFormatted}</div>
                  <div className='SingleDetail_Author'><strong> Create By:</strong> {detail.createdBy}</div>
                </div>
                <div className='SingleDetail_TagUpvotes'>
                  <div className='SingleDetail_TagContainer'>
                    {
                      detail.tags.map((tag, index) => {
                        return(
                          <div key={index} className='SingleDetail_Tag'>{tag}</div>
                        )
                      })
                    }
                  </div>
                  <div className='SingleDetail_Upvotes'> <strong> Upvotes:</strong> {detail.votes}</div>
                  <button onClick= {(e)=>{upVoteDetail(e, detail)}}> Upvote </button>
                </div>
              </div>
            )
          })
        }
        <div className='DetailsList__BottomRow'>
          <button style={{display: showDelete ? 'block' : 'none'}} 
                  className='DetailsList__BackButton' 
                  onClick={getAllListings}> 
                      Back
          </button>
          <button style={{display: showDelete ? 'none' : 'block'}} onClick={getMyListings}> My {props.detailOf}</button>
          <button onClick={addNewDeatils}> Add {props.detailOf} </button>
        </div>
      </div>
    );
  }
  
  export default DetailsList;