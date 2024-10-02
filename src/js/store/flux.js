import { useEffect } from "react";
import validator from "validator";
const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			name:"",
			phone:"",
			email:"",
			address:"",
			deleteContact:null,
			editContact:null,
			editIndex:null,
			contacts:[],
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			]
		},
		actions: {
			setName(value){
				setStore({name:value});
			},
			
			setPhone(value){
				setStore({phone:value});
			},
			
			setEmail(value){
				setStore({email:value});
			},
			
			setAddress(value){
				setStore({address:value});
			},
			setDeleteContact(value){
				setStore({deleteContact:value});
			},
			setEditContact(value){
				setStore({editContact:value});
			},
			setEditIndex(value){
				setStore({editIndex:value});
			},
			setContacts(value){
				setStore({contacts:value});
			},
			createUser: async()=>{
				try {
                    const store = getStore();

                    const response = await fetch(`https://playground.4geeks.com/contact/agendas/yasin`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({})
                    });

                    if (response.ok) {
                        const data = await response.json();
                    } else {
                        console.error("Failed to create agenda:", response.statusText);
                    }
                } catch (error) {
                    console.error("Error creating agenda:", error);
                }
			},
			AddContact: async ()=>{
				console.log("entroooooooooooooooooooo")
				 await fetch('https://playground.4geeks.com/contact/agendas/yasin/contacts', {
						method: "POST",
						headers: {
							"Content-Type": "application/json"
						},
						body: JSON.stringify({"name":getStore().name,"phone":getStore().phone,"email":getStore().email,"address":getStore().address}),
					  })
					  .then(resp => {
						  return resp.json();
					  })
					  .then(data => {
						window.location = '/';
						getActions().setName("");
						getActions().setPhone("");
						getActions().setEmail("");
						getActions().setAddress("");
					  })
					  .catch(error => {
						  console.log(error);
					  });
			},
			deleteContact: async (index)=>{
				if(getStore().contacts[index] && getStore().contacts[index].id){
				const response = await fetch("https://playground.4geeks.com/contact/agendas/yasin/contacts/"+getStore().contacts[index].id, {
						method: 'DELETE',
					});
					if (response.ok) {
						const text = await response.text();
						const data = text ? JSON.stringify(text): {};
						return data; 
					} else {
						console.log('error: ', response.status, response.statusText);
						return {error: {status: response.status, statusText: response.statusText}};
					}
				}
			},
			editContact: async (contact)=>{
				const response = await fetch("https://playground.4geeks.com/contact/agendas/yasin/contacts/"+contact.id,{
					method: "PUT",
					body: JSON.stringify(contact),
					headers: {
					  "Content-Type": "application/json"
					}
				  })
				  .then(resp => {
					console.log(resp.ok); // Will be true if the response is successful
					console.log(resp.status); // The status code=200 or code=400 etc.
					console.log(resp.text()); // Will try to return the exact result as a string
					return resp.json(); // (returns promise) Will try to parse the result as JSON and return a promise that you can .then for results
				  })
				  .then(data => {
					//data = newContact;
					//  console.log(data); // This will print on the console the exact object received from the server
				  })
				  .catch(error => {
					  //   // Error handling
					  console.log(error);
				  });
			},
			getIndex(contact){
				getStore().contacts.map((cont,ind)=>{
					if(cont.id==contact.id){
						return ind;
					}
						
				})
			},
			getAllContacts(){
					     fetch("https://playground.4geeks.com/contact/agendas/yasin/contacts")
						.then(res => res.json())
						.then(data => {
							getActions().setContacts(data.contacts);
						})
						.catch(err => console.error(err))
			},
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},
			loadSomeData: () => {
				/**
					fetch().then().then(data => setStore({ "foo": data.bar }))
				*/
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			}
		}
	};
};

export default getState;
