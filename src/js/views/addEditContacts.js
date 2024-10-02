import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import validator from "validator";
export const AddEditContacts = () => {
	const { store, actions } = useContext(Context);
	const [errors,setErrors]=useState("");
	const handleAdd=()=>{
		if(!validator.isEmpty(store.name)&&!validator.isEmpty(store.email)&&!validator.isEmpty(store.phone)&&!validator.isEmpty(store.address)&&validator.isEmail(store.email)&&validator.isMobilePhone(store.phone)){
			console.log("fdsafdasfdasfds")
			setErrors("")
			actions.AddContact()
		}
		else{
			setErrors("One Or More Fields Requiered Your Attention")
		}
	}
	return (
		<div className="container">
		<div>
			<h1 className="text-center mt-5">Add a new contact</h1>
			{
				errors!=""?<>
				<div class="alert alert-danger alert-dismissible fade show" role="alert">{errors}</div>
				</>:""
			}
			<form>
				<div className="form-group">
					<label>Full Name</label>
					<input type="text" className="form-control" placeholder="Full Name" value={store.name} onChange={(e) => actions.setName(e.target.value)}/>
				</div>
				<div className="form-group">
					<label>Email</label>
					<input type="email" className="form-control" placeholder="Enter email" value={store.email} onChange={(e) =>actions.setEmail(e.target.value)} />
				</div>
				<div className="form-group">
					<label>Phone</label>
					<input type="phone" className="form-control" placeholder="Enter phone" value={store.phone}  onChange={(e) => actions.setPhone(e.target.value)}/>
				</div>
				<div className="form-group">
					<label>Address</label>
					<input type="text" className="form-control" placeholder="Enter address" value={store.address} onChange={(e) =>actions.setAddress(e.target.value)}/>
				</div>
				<button type="button" className="btn btn-primary form-control" onClick={handleAdd}>save</button>
				<Link className="mt-3 w-100 text-center" to="/">or get back to contacts</Link>
			</form>
		</div>
	</div>
	);
};


