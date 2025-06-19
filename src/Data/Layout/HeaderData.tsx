
export const notificationData = [
    {
        color:"primary",
        time:"Just Now",
        link:`${process.env.PUBLIC_URL}/chat/privatechats`,
        title:"What`s the project report update?",
        userName:"Rick Novak",
        image:"10.jpg"
    },
    {
        color:"secondary",
        time:"12:47 am",
        link:`${process.env.PUBLIC_URL}/chat/privatechats`,
        title:"James created changelog page",
        userName:"Susan Connor",
        image:"4.jpg"
    },
    {
        color:"tertiary",
        time:"06:10 pm",
        link:`${process.env.PUBLIC_URL}/chat/privatechats`,
        title:"Polly edited Contact page",
        userName:"Roger Lum",
        image:"1.jpg"
    }
]

export const cartHeaderData = [
    {
        color:"primary",
        image:"1.png",
        title:"Apple Computers",
        price:"$2600.00",
        value:5,
        show:false
    },
    {
        color:"secondary",
        image:"2.png",
        title:"Microwave",
        price:"$1450.45",
        value:5,
        show:false
    },
    {
        color:"tertiary",
        image:"3.png",
        title:"Mackup Kit",
        price:"$300.45",
        value:5,
        show:false
    }
]

export const bookMarkData = [
    {
      icon: "Filter",
      path: "/forms/formscontrols/formvalidation",
      title: "Form",
      color: "primary",
    },
    {
      icon: "Profile",
      path: "/users/userprofile",
      title: "Profile",
      color: "secondary",
    },
    {
      icon: "Edit-line",
      path: "/table/reactstraptable/basictable",
      title: "Tables",
      color: "warning",
    },
  ];
export const messagesHeaderData = [ 
    {
        borderColor:"primary",
        title:"Design meeting",
        time:"Just Now",
        status:"Open",
    },
    {
        borderColor:"secondary",
        title:"Weekly scurm Meeting",
        time:"1 Hour Ago",
        status:"Open",
    },
    {
        borderColor:"tertiary",
        title:"Check your login page",
        time:"2 Hour Ago",
        status:"Closed" ,
    },
]

export const userProfilesData = [ 
    {
        icon:"Profile",
        link:`${process.env.PUBLIC_URL}/myprofile`,
        title:"Profile"
    },
    // {
    //     icon:"Message",
    //     link:`${process.env.PUBLIC_URL}/email/letterbox`,
    //     title:"Inbox"
    // },
    {
        icon:"Setting",
        link:`${process.env.PUBLIC_URL}/accountsettings`,
        title:"Setting"
    },
    {
        icon:"Logout",
        link:`${process.env.PUBLIC_URL}/login`,
        title:"Log Out"
    },
]