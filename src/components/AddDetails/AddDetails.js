import React, {useState} from 'react';
import Select from 'react-select';
import './AddDetails.css';

function AddDetails() {
    const [selectedTags, setSelectedTags] = useState([]);
    //const [errorDetails, setErrorDetails] = useState([false, false, false]);

    // This is the list of all the predefined tags
    let allTags = [
        {
            value:'feature',
            label:'Feature'
        },
        {
            value:'tech',
            label:'Tech'
        },
        {
            value:'bug',
            label:'Bug'
        },
        {
            value:'dependency',
            label:'Dependency'
        },
        {
            value:'ticket',
            label:'Ticket'
        },
        {
            value:'high',
            label:'High'
        },
        {
            value:'task',
            label:'Task'
        },
        {
            value:'custom',
            label:'Custom'
        },
        {
            value:'specific',
            label:'Specific'
        }
    ];

    let activeTab = localStorage.getItem("activeTab");
    let loginId = localStorage.getItem("loginId");

    // This function will be used to update the selected tags.
    const selectedTagsHandler = (e) => {
        setSelectedTags(e.map(tag => tag.label))
    }

    // This function will be used to add a new detail either idea or a challange.
    const addDetail = () =>{

        const itemDetail = {};
        itemDetail.title = document.getElementById('detailsTitle').value;
        itemDetail.description = document.getElementById('detailsDescription').value;
        itemDetail.tags = selectedTags
        itemDetail.createdBy = Number(loginId);
        itemDetail.votes = 0 ;
        itemDetail.date = Date.now();

        if(itemDetail.title && itemDetail.description && selectedTags.length){
            if(activeTab === 'Challanges'){
                fetch('http://localhost:8000/challenges', {
                    method: 'POST',
                    headers: { 
                        'Accept': 'application/json',
                        'Content-Type': 'application/json' 
                    },
                    body: JSON.stringify(itemDetail)
                })
                .then(res => res.json()) 
                .then(res => {
                    localStorage.setItem("activeTab", 'Challanges');
                    window.location.replace('/home');
                } )   
            }
            else if( activeTab === 'Ideas'){
                fetch('http://localhost:8000/ideas', {
                    method: 'POST',
                    headers: { 
                        'Accept': 'application/json',
                        'Content-Type': 'application/json' 
                    },
                    body: JSON.stringify(itemDetail)
                })
                .then(res => res.json()) 
                .then(res => {
                    localStorage.setItem("activeTab", 'Ideas');
                    window.location.replace('/home');
                } )   
            }
        }    
    }

    return (
      <div className='AddDetails__Wrapper'> 
        <h1 className='AddDetails__HeaderText'> Please add your {activeTab} here </h1>
        <div className='AddDetails__Container'>
          <div className='AddDetails__Card'>
                <label>Title </label>
                <input id='detailsTitle' type="text"/>
                <label>Description </label>
                <textarea id="detailsDescription"  rows="4" ></textarea>
                <label>Tags </label>
                <Select isMulti options={allTags} onChange={selectedTagsHandler}></Select>
                <button onClick={addDetail}> Add Item </button>
          </div>
        </div>
      </div>
    );
  }
  
  export default AddDetails;