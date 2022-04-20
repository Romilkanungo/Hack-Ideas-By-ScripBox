import React, {useState} from 'react';
import './HomePage.css';
import Details from '../DetailsList/DetailsList';

function Homepage() {
  const [activeTab, setActiveTab] = useState(localStorage.getItem("activeTab") ? localStorage.getItem("activeTab") : "Challanges");

  let userId = localStorage.getItem("loginId");

  localStorage.setItem("activeTab", activeTab);

    return (
      <div className='HomePage__Wrapper'>
        <h1 className='HomePage__HeaderText'> Welcome {userId}, All Challanges and Ideas can bee seen here</h1>
        <div className='HomePage__Container'>
          <div className='HomePage__Card'>
            <div className='HomeCard__Text'> {activeTab} </div>
            <div className='HomePage__TabsContainer'>
                <div className={`HomePage__Tabs Tabs_Challanges ${activeTab === 'Challanges' ? "activeTab" : ""}`} onClick={() => setActiveTab('Challanges')}> Challanges </div>
                <div className={`HomePage__Tabs Tabs_Ideas ${activeTab === 'Ideas' ? "activeTab" : ""}`} onClick={() => setActiveTab('Ideas')}> Ideas </div>
            </div>
            <Details detailOf={activeTab} userId={userId}/>
          </div>
        </div>  
      </div>
    );
  }
  
  export default Homepage;