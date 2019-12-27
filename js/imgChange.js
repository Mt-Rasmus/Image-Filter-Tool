
/*
** This file contains functionality to apply css filters to an imported image with buttons
** as well as resetting filters, plus clearing and saving the image.
*/

reset(); // set start values for filters

function init() {

document.getElementById("incrBrightness").addEventListener("click", changeFilterValue);
document.getElementById("decrBrightness").addEventListener("click", changeFilterValue);

document.getElementById("incrSaturation").addEventListener("click", changeFilterValue);
document.getElementById("decrSaturation").addEventListener("click", changeFilterValue);

document.getElementById("incrContrast").addEventListener("click", changeFilterValue);
document.getElementById("decrContrast").addEventListener("click", changeFilterValue);

document.getElementById("incrHueRot").addEventListener("click", changeFilterValue);
document.getElementById("decrHueRot").addEventListener("click", changeFilterValue);

document.getElementById("incrBlur").addEventListener("click", changeFilterValue);
document.getElementById("decrBlur").addEventListener("click", changeFilterValue);

document.getElementById("incrOpacity").addEventListener("click", changeFilterValue);
document.getElementById("decrOpacity").addEventListener("click", changeFilterValue);

document.getElementById("incrSepia").addEventListener("click", changeFilterValue);
document.getElementById("decrSepia").addEventListener("click", changeFilterValue);

document.getElementById("toggleGrey").addEventListener("click", toggleFilter);
document.getElementById("toggleInverse").addEventListener("click", toggleFilter);

document.getElementById("resetFilters").addEventListener("click", reset);
document.getElementById("clearImage").addEventListener("click", clear);
document.getElementById("saveImg").addEventListener("click", saveImage);

}

// returns the name of the html attribute stored for a filter effect
function getAttribInfo(value) {
    if(value === "incrBrightness" || value === "decrBrightness")
        // returns: attribute, css variable, increment, unit, minvalue, maxvalue, startvalue
        return ["data-bright", "--brightness", 5, "%", 0, 1000, 100];
    else if(value === "incrSaturation" || value === "decrSaturation")
        return ["data-sat", "--saturate", 5, "%", 0, 1000, 100];    
    else if(value === "incrContrast" || value === "decrContrast")
        return ["data-cont", "--contrast", 5, "%", 0, 1000, 100];           
    else if(value === "incrHueRot" || value === "decrHueRot")
        return ["data-hue", "--hueRotate", 5, "deg", -Infinity, Infinity, 0];       
    else if(value === "incrBlur" || value === "decrBlur")
        return ["data-blur", "--blur", 1, "px", 0, 100, 0];  
    else if(value === "incrOpacity" || value === "decrOpacity")
        return ["data-opacity", "--opacity", 5, "%", 0, 100, 100];  
    else if(value === "incrSepia" || value === "decrSepia")
        return ["data-sepia", "--sepia", 5, "%", 0, 100, 0];    
    else if(value === "toggleGrey")
        return ["data-grey", "--grayscale", 0];    
    else if(value === "toggleInverse")
        return ["data-grey", "--invert", 0];           
}

function changeFilterValue(e) {
    e.preventDefault(); // prevents default behavior
    let btnValue = e.target.id;
    let valArray = getAttribInfo(btnValue);
    let attribute = valArray[0], attribVar = valArray[1],
        changeVal = valArray[2], unit = valArray[3]
        minVal = valArray[4], maxVal = valArray[5];  
    let imgRef = document.getElementById('img1');       
    let newValue = 0;        
    let currValue = parseInt(imgRef.getAttribute(attribute));

    if(btnValue.substring(0,4) === "incr" && currValue < maxVal) 
        newValue = parseInt(imgRef.getAttribute(attribute)) + changeVal;
    else if(btnValue.substring(0,4) === "decr" && currValue > minVal) 
        newValue = parseInt(imgRef.getAttribute(attribute)) - changeVal;
    else
        return;
    imgRef.style.setProperty(attribVar, `${newValue + unit}`);
    imgRef.setAttribute(attribute, newValue);
}

function toggleFilter(e) {
    e.preventDefault(); // prevents default behavior
    let btnValue = e.target.id;
    let valArray = getAttribInfo(btnValue);
    let attribute = valArray[0], attribVar = valArray[1];    
    let imgRef = document.getElementById('img1');
    let currValue = parseInt(imgRef.getAttribute(attribute));
    let newValue = 0;

    if(currValue != 1.0)
        newValue = 1.0;
    else 
        newValue = 0;

        imgRef.style.setProperty(attribVar, newValue);
        imgRef.setAttribute(attribute, newValue);   
}

// reset all filters
function reset() {
    let imgRef = document.getElementById('img1');
    imgRef.style.setProperty("--brightness", "100%"); imgRef.setAttribute("data-bright", "100");
    imgRef.style.setProperty("--saturate", "100%"); imgRef.setAttribute("data-sat", "100");
    imgRef.style.setProperty("--contrast", "100%"); imgRef.setAttribute("data-cont", "100");
    imgRef.style.setProperty("--hueRotate", "0deg"); imgRef.setAttribute("data-hue", "0");
    imgRef.style.setProperty("--blur", "0px"); imgRef.setAttribute("data-blur", "0");
    imgRef.style.setProperty("--opacity", "100%"); imgRef.setAttribute("data-opacity", "100");
    imgRef.style.setProperty("--sepia", "0%"); imgRef.setAttribute("data-sepia", "0");
    imgRef.style.setProperty("--grayscale", "0"); imgRef.setAttribute("data-grey", "0");
    imgRef.style.setProperty("--invert", "0"); imgRef.setAttribute("data-invert", "0");
}

function clear() {
    reset();
    $('#img1').hide();   
    $('#droparea').show();   
}

function saveImage() {

    let canvas = document.createElement('canvas');
    canvas.parentElement = document.getElementById('right-section');

    let canvasContext = canvas.getContext('2d');

    let imgRef = document.getElementById('img1');
    canvas.width = imgRef.naturalWidth;
    canvas.height = imgRef.naturalHeight;
    canvas.id = "canvas";
    console.log("img dim: " + imgRef.width + " x " + imgRef.height);
    console.log("canvas dim: " + canvas.width + " x " + canvas.height);

    $(imgRef).appendTo("#canvas");  
    var cssFilter = getComputedStyle(imgRef).filter;
    canvasContext.filter = cssFilter;

    canvasContext.drawImage(imgRef, 0, 0, imgRef.naturalWidth,imgRef.naturalHeight,
        0, 0, canvas.width, canvas.height);

    let dataURL = canvas.toDataURL('image/jpg'); 
    let saveBtbRef = document.getElementById('saveImg');
    saveBtbRef.href = dataURL;

}