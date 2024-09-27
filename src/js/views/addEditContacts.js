import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import validator from "validator";
export const AddEditContacts = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="container">
		<div>
			<h1 className="text-center mt-5">{store.editContact==null?"Add":"Edit"} a new contact</h1>
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
				<button type="button" className="btn btn-primary form-control" onClick={actions.AddContact}>save</button>
				<Link className="mt-3 w-100 text-center" to="/">or get back to contacts</Link>
			</form>
		</div>
	</div>
	);
};


