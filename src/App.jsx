import { Children, useState } from 'react';

//import {FaChildCombatant } from 'react-icons/fa'
//import { FaBeer } from "react-icons/fa";

const initialFriends = [
    {
      id: 118836,
      name: "Idoko EO..",
      image:"images/idoko.jpg",
      balance: -7,
    },
    {
      id: 933372,
      name: "Idoko Ju...happy birthday",
      image: "images/dad.jpg",
      balance: 200000,
    },
    {
      id: 499476,
      name: "mrs john helen",
      image: "images/mom.jpg",
      balance: 0,
    },
    {
      id: 499475,
      name: "esther johnny",
      image: "images/johnny.png",
      balance: 0,
    },
  ];


 function Button ({ children, onClick }) {
   return <button className='button' onClick={onClick}>{children}</button>  
  }

  
  function App() {
    const[friends, setFriends] = useState(initialFriends);
  const [showAddFriend, setShowAddFriend] = useState(false);
  const [selectedFriend, setSelectedFriend] =useState(null);

  function handleShowAddFriend(){
    setShowAddFriend((show) => !show);
  }

  

  function handleAddFriend(friend){
    setFriends((friends) => [...friends, friend]);
    setShowAddFriend (false);
  }

  function handleSelection(friend){
   // setSelectedFriend(friend)
   setSelectedFriend((cur) =>
   (cur?.id === friend.id ?
     null : friend ));
     // to close one form
     setShowAddFriend(false);
  }

  function handleSpiltBill(value) {
    


    setFriends((friends) =>
    friends.map((friend) => 
    friend.id === selectedFriend.id
    ? {...friend, balance: friend.balance + value}
    : friend
    ));
    setSelectedFriend(null);
    
  }
  
    return (
      <div className='app'>

        <div className='sidebar'>
          <h1 className='billing'>SHARE BILL WITH FRIENDS</h1>
        <FriendsList 
        friends={friends}
         selectedFriend={selectedFriend}
        onSelection = {handleSelection}
        />

      {showAddFriend && <FormAddFriend  onAddFriend =
      {handleAddFriend} />}

        <Button onClick={handleShowAddFriend}>{showAddFriend ? "close" : "add friend"}
        </Button>
        </div>
      {selectedFriend && ( 
      <FormSplitBill  
      selectedFriend={selectedFriend}
      onSplitBill={handleSpiltBill}
    

      />
      )}
      </div>
    );
  } 

function FriendsList({ friends, onSelection, selectedFriend }){
  
    
    return(
        <ul>
{friends.map((friend) => (
   <Friend friend={friend} key={friend.id} 
   selectedFriend ={selectedFriend}
   onSelection={onSelection} 
   
   />
))}
        </ul>
    );
  }

  function Friend({ friend, onSelection, selectedFriend}) {

    const  isSelected = selectedFriend?.id === friend?.id;


    return(
        <li className={isSelected ? "selected":""}>
            <img src={friend.image} alt={friend.name} />
            <h3>{friend.name}</h3>
            {friend.balance < 0 && (
              <p className='red'>
                You owe {friend.name} {Math.abs(friend.balance)}$
              </p>
            ) }
             {friend.balance > 0 && (
              <p className='green'>
                 {friend.name} owes you {Math.abs(friend.balance)}$
              for birthday </p>
            ) }

              {friend.balance === 0 && <p>You and {friend.name} show me love..</p> }

           <Button onClick={() => onSelection(friend)} >
            {isSelected ? "close" : "select"}
           </Button>

        </li>
    );
  }

  
   
    function FormAddFriend({onAddFriend}) {

      const[name, setName] = useState('')
      const[image, setImage] = useState("")

      function handleSubmit(e) {
        e.preventDefault();

        if(!name || !image) return;
      
        const id = crypto.randomUUID();

        const newFriend = {
          id,
          name, 
          image: `${image}?=${id}`,
          balance: 0,
         
        
        
        };
            onAddFriend(newFriend)
        setName('')
        setImage("");

      }
      return (
        <form className='form-add-friend' onSubmit={handleSubmit}>
            <label> friend name </label>
          <input type='text' value={name} onChange={(e) => setName(e.target.value)}/>
          <label>image URL</label>
          <input type ='text' value={image} onChange={(e) => setImage(e.target.value)}/>

          <Button>Add</Button>
        </form>
      )
    }
//commiting code

    function FormSplitBill({selectedFriend, onSplitBill}) {

      const [bill, setBill]= useState("");
      const [paidByUser, setPaidByUser]= useState("");
const paidByFriend = bill ? bill - paidByUser : "";

      const [whoIsPaying, setWhoIsPaying] = useState("user")

function handleSubmit(e){
      e.preventDefault();
      
      if(!bill || !paidByUser) return;
      onSplitBill(whoIsPaying === 'user' ? paidByFriend :
      -paidByUser); 
      }

      return(
        <form className='form-split-bill' onSubmit=
         {handleSubmit}>

          <h2>Split a bill with {selectedFriend.name}</h2>
          <label > Bill value</label>
          <input type ='text' value={bill} onChange={(e) =>
            setBill(Number(e.target.value))}/>

          <label> Your expense</label>
          <input
           type ='text' placeholder="help-out" value={paidByUser}
           onChange={(e) => setPaidByUser
            (Number(e.target.value) > bill ? paidByUser :
           Number(e.target.value))
          
        } 
          />
            


          <label>{selectedFriend.name}'s expense </label>
          <input type ='text'  disabled value={paidByFriend} />

          <label>who is paying the bill</label>
          <select value={whoIsPaying}
          onChange={(e) => setWhoIsPaying(e.target.value)}>
            <option value= "user">You</option>
            <option value= "friend">{selectedFriend.name}</option>
          </select>

  <Button>Split bill</Button>

        </form>
      );
    }
  
  export default App;




  
  
  