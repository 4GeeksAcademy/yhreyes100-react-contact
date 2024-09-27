import React,{ useContext, useEffect } from "react"; 
import "../../styles/home.css";
import { Context } from "../../js/store/appContext";
import { ContactCard } from "../../js/component/contactCard";
import { Link } from "react-router-dom";
export const Contacts = () => {
	const { store, actions } = useContext(Context);
	useEffect(()=>{
		actions.getAllContacts();
	},[])
	return (
		<div className="container">
			<p className="text-right my-3">
                        <Link className="btn btn-success" to="/add">Add new contact</Link>
            </p>
		<div>
				<div id="contacts" className="panel-collapse collapse show" aria-expanded="true">
					<ul className="list-group pull-down" id="contact-list">
					{
					store.contacts!=null?	
					store.contacts.map((contact,index)=>(
						<ContactCard key={index} contact={contact} index={index}/>
					)):""
					}
					</ul>
				</div>
		</div>
		
		</div>
	);
};
