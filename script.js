

var subnetMask = document.querySelector(".Mask");
var wildMask = document.querySelector(".wildMask");
var network = document.querySelector(".network");
var broadcast = document.querySelector(".broadCast");
var lastHost = document.querySelector(".lastHost");
var firsthost = document.querySelector(".firstHost");
var hostrange = document.querySelector(".hostRange");

var BinarysubnetMask = document.getElementById("binary-Mask");
var BinarywildMask = document.getElementById("binary-Wildmask");
var Binarynetwork = document.getElementById("binary-Network");
var BinarybroadCast = document.getElementById("binary-broadCast");
var BinarylastHost = document.getElementById("binary-lastHost");
var BinaryfirstHost = document.getElementById("binary-firstHost");

var ipInput = document.querySelector(".ipAdress input").value;
const ipDOM = document.getElementById("ipDOM");
const slashRange = document.getElementById("slashRange");
const slashDOM = document.querySelector(".slash");

var errorText = document.querySelector(".error-text");
var arrow1 = document.querySelector(".arrow-1");
var arrow2 = document.querySelector(".arrow-2");
var arrow3 = document.querySelector(".arrow-3");
var arrow4 = document.querySelector(".arrow-4");

const binarPow = [128,64,32,16,8,4,2,1];


ipDOM.addEventListener("input",(e)=>{
    const ip = e.target.value;
    const octetArr = ip.split(".");

    if(octetArr.length === 4 && octetArr.every(el => el.match(/^[0-9]+$/) &&  +el >=0 && +el <256)){
        isIpValid = true;
        arrow1.style.visibility = "hidden";
        arrow2.style.visibility = "hidden";
        arrow3.style.visibility = "hidden";
        arrow4.style.visibility = "hidden";
        errorText.style.visibility = "hidden";
    }else {
        isIpValid = false;
        errorDOM(octetArr);
    }

})

slashRange.addEventListener("input", (e)=>{
    slashDOM.textContent = "/" + e.target.value;
    if(isIpValid){
        calc();
    }
    
})

function tobinary(sum){
    const binarPow = [128,64,32,16,8,4,2,1];
    let number = 0;
    let binery ='';
    sum ++;
    while (sum > 0 && number<8){
        if(sum> binarPow[number]){
            sum = sum - binarPow[number] ;
            binery += '1';
        }else if(binery.length == 8){
            sum = sum + "."
        }else if(binery.length == 17){
            sum = sum + "."
        }else if(binery.length == 26){
            sum = sum + "."
        }else binery += '0';
        number++;

    }
    
    return binery;

}

function generateMask(slashValue){
    subnetMask.textContent = '';
    BinarysubnetMask.textContent ='';
    const mteli = Math.floor(slashValue/8);
    const nashti = slashValue - (mteli * 8);

    let sum = 0;
    binarPow.forEach((el,index) => {
        if(index < nashti){
            sum += el;
        }
    })

    let mask =""
    switch(mteli){
        case 0:
            mask = `${sum}.0.0.0`
            break;
        case 1 :
            mask = `255.${sum}.0.0`
            break;
        case 2:
            mask = `255.255.${sum}.0`
            break;
        case 3:
            mask = `255.255.255.${sum}`
            break;
        case 4:
            mask =`255.255.255.255`
            break;
    }
    let binary = tobinary(sum);
    let binaryMask = ''
    switch(mteli){
        case 0:
            binaryMask = `${binary}.00000000.00000000.00000000`
            break;
        case 1 :
            binaryMask = `11111111.${binary}.00000000.00000000`
            break;
        case 2:
            binaryMask = `11111111.11111111.${binary}.00000000`
            break;
        case 3:
            binaryMask = `11111111.11111111.11111111.${binary}`
            break;
        case 4:
            binaryMask =`11111111.11111111.11111111.11111111`
            break;
    }
    subnetMask.textContent = mask 
    BinarysubnetMask.textContent = binaryMask;
    return mask;
}
function generateWildMask(mask){
    wildMask.textContent = '';
    let container = mask.split(".").map(el => 255 - +el).join(".");
    wildMask.textContent = container;
    
    BinarywildMask.textContent = '';
    let binaryContainer = mask.split(".").map(el => tobinary(255 - +el)).join(".");
    BinarywildMask.textContent = binaryContainer;
    
    return container;
}
function generateNetwork(ipAddress, maskAddress){
    network.textContent = '';
    const ipArr = ipAddress.split(".");
    const maskArr = maskAddress.split(".");
    let container = ipArr.map((el,index) => +el & +maskArr[index]).join(".");
    let binaryContainer = ipArr.map((el,index) => tobinary(+el & +maskArr[index])).join(".");
    network.textContent = container;
    Binarynetwork.textContent = binaryContainer;
    return container
}
function generateBroadcast(netAddress,wildMaskAddress){
    broadcast.textContent = '';
    const netAddressArr = netAddress.split(".");
    const wildMaskAddressArr = wildMaskAddress.split(".");
    let container = netAddressArr.map((el,index) => +el + +wildMaskAddressArr[index]).join(".");
    let binaryContainer = netAddressArr.map((el,index) => tobinary(+el + +wildMaskAddressArr[index])).join(".");
    broadcast.textContent = container;
    BinarybroadCast.textContent = binaryContainer;
    return container;
}
function generateFirstHostAddress(netStr){
    firsthost.textContent = '';
    const netAddressArr = netStr.split(".");
    let container = netAddressArr.map((el,index) => index<3 ? el : +el +1 ).join(".");
    let binaryContainer = netAddressArr.map((el,index) => index<3 ? tobinary(el) : tobinary(+el +1) ).join(".");
    firsthost.textContent = container;
    BinaryfirstHost.textContent = binaryContainer;
    return container;

}
function generateLastHostAddress(brodStr){
    lastHost.textContent = '';
    const broadAddressArr = brodStr.split(".");
    let container = broadAddressArr.map((el,index)=> index < 3 ? el : +el-1).join(".");
    let binaryContainer = broadAddressArr.map((el,index)=> index < 3 ? tobinary(el) : tobinary(+el-1)).join(".");
    lastHost.textContent = container;
    BinarylastHost.textContent = binaryContainer;
    return container;

}
function generateHostRange(slashNum){
    hostrange.textContent = '';
    let container = Math.pow(2, 32 - slashNum) - 1; 
    hostrange.textContent = container;
    return container; 
}

const calc = () =>{

const ipStr = ipDOM.value
const slash = slashRange.value;


const maskStr = generateMask(+slash);
const wildMaskStr = generateWildMask(maskStr);
const netAddress = generateNetwork(ipStr, maskStr);
const broadAddress = generateBroadcast(netAddress,wildMaskStr);
const FirstHostaddress = generateFirstHostAddress(netAddress);
const lastHostaddress = generateLastHostAddress(broadAddress);
const hostRangecall = generateHostRange(+slash);

}

const errorDOM = (octetArr) =>{
        errorText.textContent = "Your IP is invalid";

        arrow1.style.visibility = "hidden";
        arrow2.style.visibility = "hidden";
        arrow3.style.visibility = "hidden";
        arrow4.style.visibility = "hidden";

        errorText.style.visibility = "visible";
        if(octetArr.length!=4){
            if (!octetArr[0]) {
                arrow1.style.visibility = "visible";
            }
            if (!octetArr[1]) {
                arrow2.style.visibility = "visible";
            }
            if (!octetArr[2]){ 
                arrow3.style.visibility = "visible";
            }
            if (!octetArr[3]) {
                arrow4.style.visibility = "visible";
            }  
            return;
        } 
        if( octetArr.some(el => !/^[0-9]+$/.test(el))){
            const digitsTester = /^[0-9]+$/
        
            if(!digitsTester.test(octetArr[0])){
                arrow1.style.visibility = "visible";
            }
            if(!digitsTester.test(octetArr[1])){
                arrow2.style.visibility = "visible";
            }
            if(!digitsTester.test(octetArr[2])){
                arrow3.style.visibility = "visible";
            }
            if(!digitsTester.test(octetArr[3])){
                arrow4.style.visibility = "visible";
            }
            return;
        }
        if(octetArr.some(el => +el<255)){
            
            if(+octetArr[0]>255){
                arrow1.style.visibility = "visible";
            }
            if(+octetArr[1]>255){
                arrow2.style.visibility = "visible";
            }
            if(+octetArr[2]>255){
                arrow3.style.visibility = "visible";
                errorText.textContent = "Your Ip exceeds 0-255";}
            if(+octetArr[3]>255){
                arrow4.style.visibility = "visible";
            }
            return;
            }
        }