
    document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");
    const nameField = document.querySelector('input[name="name"]');
    const emailField = document.querySelector('input[name="email"]');
    const phoneField = document.querySelector('input[name="phone"]');
    const messageField = document.getElementById("message");
    const messageContainer = document.querySelector(".messages");

    form.addEventListener("submit", function(e) {
        e.preventDefault();

        // no field empty
        if (
            nameField.value === "" ||
            emailField.value === "" ||
            phoneField.value === "" ||
            messageField.value === ""
        ) {
            alert("Please fill all fields !");
            return;
        }

        // name validate
        const nameRegax = /^[A-Za-z\s]+$/;
        if (!nameRegax.test(nameField.value)) {
            alert("Name must be letters only!");
            return;
        }

        // email validate
        const emailRegax = /^[A-Za-z._%+-]+@[A-Za-z.-]+\.(com)$/;
        if (!emailRegax.test(emailField.value)) {
            alert("Not correct email !");
            return;
        }

        // phone validate
        const phoneRegax = /^[0-9]+$/;
        if (!phoneRegax.test(phoneField.value)) {
            alert("Phone must be numbers !");
            return;
        }

        // not empty message
        if (messageField.value.trim() === "") {
            alert("Message is empty !");
            return;
        }

        // if everything is correct store data
        let contact = JSON.parse(localStorage.getItem("contact")) || [];

        let newMessage = {
            name: nameField.value,
            email: emailField.value,
            phone: phoneField.value,
            message: messageField.value,
        };

        contact.push(newMessage);
        localStorage.setItem("contact", JSON.stringify(contact));
        alert("Data is saved !");
        form.reset();

        // show messages in dashboard
    });
        // const messagesContainer = document.querySelector(".messages");
        // let messages = JSON.parse(localStorage.getItem("contact")) || [];

        // if (messagesContainer) {
        //     messagesContainer.innerHTML = "";

        //     messages.forEach((message) => {
        //         messagesContainer.innerHTML += `
        //         <div class="message-box">
        //             <div class="icon"><i class="fa-solid fa-comments"></i></div>
        //             <p>
        //                 ${message.message}
        //             </p>
        //             <div class="client">
        //                 <img src="../images/about/testimonial.png" alt="Client">
        //                 <span> ${message.nameField.value}</span>
        //             </div>
        //         </div>`


        //     })
        // }
        const messagesContainer = document.querySelector(".messages");
        let messages = JSON.parse(localStorage.getItem("contact")) || [];
        // let message = {
        //     name: "Mustafa",
        //     email: "mustafa@example.com",
        //     phone: "1234567890",
        //     message: "Hello, this is a test messa."
        // };
        // messages.push(message);
        // localStorage.setItem('contact', JSON.stringify(messages));
        if (messagesContainer) {
            messagesContainer.innerHTML = "";

            messages.forEach((message) => {
                messagesContainer.innerHTML += `
        <div class="message-box">
          <div class="icon"><i class="fa-solid fa-comments"></i></div>
          <p>
            ${message.message}
          </p>
          <div class="client">
            <img src="../images/about/testimonial.png" alt="Client">
            <span>${message.name}</span>
          </div>
        </div>`;
            });
        }
    
});



    
    //our 
    // document.addEventListener("DOMContentLoaded",function () {

    //     const form = document.querySelector("form");
    //     const nameField = document.querySelector('input[name="name"]');
    //     const emailField = document.querySelector('input[name="email"]');
    //     const phoneField = document.querySelector('input[name="phone"]');
    //     const messageField = document.getElementById("message");

    //     form.addEventListener("submit", function(e){
    //         e.preventDefault()
    //     })

    //     // no feild empty 
    //     if(
    //     nameField.value === "" || 
    //     emailField.value === "" ||
    //     phoneField.value === "" ||
    //     messageField.value === "" 
    //     ) {
    //         alert("Please fill all feild !");
    //         return;
    //     }

    //     //name validate
    //     const nameRegax = /^[A-Za-z\s]+$/;
    //     if (!nameRegax.test(nameField.value)){
    //         alert("name must be letters !");
    //         return;
    //     }

    //     //name validate
    //     const emailRegax = /^[A-Za-z._%+-]+@[A-Za-z.-]+\.(com)$/;
    //     if(!emailRegax.test(emailField.value)){
    //         alert("not correct email !");
    //         return;
    //     }

    //     //phone validate 
    //     const phoneRegax = /^[0-9]+$/;
    //     if(!phoneRegax.test(phoneField.value)){
    //         alert("phone must be numbers !");
    //         return;
    //     }

    //     //not empty message
    //     if(messageField.value.trim() === "" ){
    //         alert("message is empty !");
    //         return;
    //     }

    //     //if everything is correct store data
    //     let contact = JSON.parse(localStorage.getItem("contact")) || []

    //     //we get old data to avoid deleting
    //     let newMessage = {
    //         name : nameField.value,
    //         email : emailField.value,
    //         phone : phoneField.value,
    //         message : messageField.value,
    //     };

    //     //user data in object
    //     contact.push(newMessage);

    //     localStorage.setItem("contact", JSON.stringify(contact));
    //     alert("Data is saved !");

    //     form.reset();


    //     //DashBored

    //     const messageContainer = document.querySelector(".messages");
        
    //     //get messages from local storage
    //     if(messageContainer){
    //         let contact = JSON.parse(localStorage.getItem("contact")) || "" ;

    //         //loop for every msg

    //         contact.forEach(function(msg){
    //             const box = document.createElement("div");
    //             box.classList.add("message-box");   //class for styling

    //             //message icon
    //             const iconMessage = document.createElement("div");
    //             iconMessage.classList.add("icon");
    //             iconMessage.innerHTML = '<i class="fa-solid fa-comments"></i>';

    //             //message text
    //             const PMessage = document.createElement("div");
    //             PMessage.textContent = msg.message;
    //             PMessage.classList.add("message-box");

    //             //user data

    //             const clientData = document.createElement("div");
    //             clientData.classList.add("div");

    //             const span = document.createElement("span");
    //             span.textContent = msg.name;
    //             span.classList.add("client-name");

    //             //collect members
    //             clientData.appendChild(span);
    //             box.appendChild(iconMessage);
    //             box.appendChild(PMessage);
    //             box.appendChild(clientData);

    //             //add message to page 
    //             messageContainer.appendChild(box)

    //         })
    //     }

















        //when user click submit
        // form.addEventListener("submit", function(e){
        //     e.preventDefault();





            //object for new message 
            // const newMessage = {
            //     name : nameField.value,
            //     email : emailField.value,
            //     phone : phoneField.value,
            //     message : messageField.value
            // };
            // add message in contact array 
            // contact.push(newMessage);
            // store localstorage (new + old) in array
            // localStorage.setItem("contact" , JSON.stringify(contact));

            // alert("Data saved in local storage");

            // clear form 
    //         form.reset();
    //     });
   //});

    //Dashbord part
        // messages place
        // const messagesContainer = document.querySelector(".messages");

        // function to display restored messages
        // function displayMessages (){
        //     messagesContainer.innerHTML = "" ; 

            // loop for any message in contact 

        //}







    // document.addEventListener("DOMContentLoaded", function(){

    //     const form = document.querySelector("form");
    //     const nameField = document.querySelector('input[name="name"]');
    //     const emailField = document.querySelector('input[name="email"]');
    //     const phoneField = document.querySelector('input[name="phone"]');
    //     const messageField = document.getElementById("message");

    //     //restore data from localstorage
    //     let contact = JSON.parse(localStorage.getItem("contact")) || []

    //     //save all vlues which stored in form
    //     nameField.value = contact.name || "" ;
    //     emailField.value = contact.email || "" ;
    //     phoneField.value = contact.phone || "" ;
    //     messageField.value = contact.message || "" 

    //     //click on submit
    //     form.addEventListener("submit", function(e){
    //         e.preventDefault();
    //         //create object
    //         const newMessage = {
    //             name : nameField.value,
    //             email : emailField.value,
    //             phone : phoneField.value,
    //             message : messageField.value
    //         };
    //         //if user stored 
    //         const currentUser = contact.find(contact => contact.email === newMessage.email);
    //         if(currentUser){
    //             currentUser.name = newUser.name;
    //             currentUser.phone = newUser.phone;
    //             currentUser.message = newUser.message;
    //         }else{
    //             //add new user
    //             contact.push(newMessage)
    //         }
    //         //update store
    //         localStorage.setItem("contact",JSON.stringify(contact));

    //         alert("Saved in local storage");
            
    //     });

    // });

