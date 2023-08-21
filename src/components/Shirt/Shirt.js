import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getShirtById, handleDeleteById } from "../Api/API";
import "./Shirt.css";

function Shirt() {
    const [shirt, setShirt] = useState(null);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const { id } = useParams();
    const navigate = useNavigate();

     useEffect(() => {
       async function getShirtByID(id) {
         try {
           let result = await getShirtById(id);
           setShirt(result.data);
         } catch (e) {
           console.log(e);
         }
       }
       getShirtByID(id);
     }, [id]);

     async function handleDeleteRequest(id) {
       setShowConfirmation(true);
     }

     function handleCancelDelete() {
       setShowConfirmation(false);
     }

     async function handleDeleteSubmit() {
       try {
         let result = await handleDeleteById(id);
         if (result.status === 200) {
           navigate("/shirts");
         }
       } catch (error) {
         console.log(error);
       }
     }
  
     return (
       <div className="shirt">
         <section className="shirtDetails">
           <img
             className="showShirtImage"
             src={shirt?.image}
             alt="shirt"
             onClick={() => navigate(`/shirts/${shirt.id}`)}
           />
           <div className="shirtInfo">
             <p className="shirtDetailsName">
               <strong>{shirt?.name}</strong>
             </p>

             <p className="shirtColor"> Color: {shirt?.color}</p>
             <p className="shirtSize">Size: {shirt?.size}</p>
             <p className="shirtPrice">Price: ${shirt?.price}</p>
             <p className="shirtFavorite">
               Favorite: {shirt?.is_favorite ? "Yes" : "No"}
             </p>
             <a
               href={shirt?.store}
               target="_blank"
               rel="noopener noreferrer"
               className="store-link"
             >
               {shirt?.store}
             </a>
             <button
               className="shirtEdit"
               onClick={() => {
                 navigate(`/shirts/${id}/edit`);
               }}
             >
               Edit
             </button>
             <br />
             <button className="delete" onClick={() => handleDeleteRequest(id)}>
               Delete
             </button>
           </div>
         </section>

         <button
           className="shirt-button"
           onClick={() => {
             navigate("/shirts");
           }}
         >
           Go Back
         </button>

         {showConfirmation && (
           <div className="shirt-deletion-container-navigation">
             <p>
               <strong>Are you sure you want to delete this shirt?</strong>
             </p>
             <ul>
               <li>
                 <button onClick={handleDeleteSubmit}>Yes</button>
               </li>
               <li>
                 <button onClick={handleCancelDelete}>No</button>
               </li>
             </ul>
           </div>
         )}
       </div>
     );
}

export default Shirt