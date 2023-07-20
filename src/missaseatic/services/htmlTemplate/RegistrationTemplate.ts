


export const RegisterTemplate = (name,link)=>{
    return `<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Email Template</title>
    </head>
    <body>
    <div>
    <p>
    // hey${name}
    <br>
    ThankYou for Registration<br>
    this is your link <br> ${link}

    </p>
    </div>
        <div class="template" style =   "display: flex; justify-content:center;  flex-direction: column; margin-left: 20px; ">
            <img src="cid:logo1.png" width="170px" height="125px" alt="">
            
        <div class="text" style =  "margin-left: 85px; position: absolute; top:0; padding-left: 90px;">
            <div class="vl" height="175px" style = "padding-left: 20px; border-left: 4px solid rgb(26, 21, 21);">
                <h2>MissAseatic</h2>
                <p  style="font-size:15px; padding-top: 5px;  line-height: 7px; font-family: initial;">Thanks & Regards</p>
                <p  style="font-size:15px; padding-top: 5px;  line-height: 7px; font-family: initial;">Managing Director</p>
                <p  style="font-size:15px; padding-top: 5px;  line-height: 7px; font-family: initial;">Contact Us: 7897899873</p>
                <p  style="font-size:15px; padding-top: 5px;  line-height: 7px; font-family: initial;">Email: missaseatic@gmail.com</p>
               
            </div>
        </div>
        </div>
        `
}