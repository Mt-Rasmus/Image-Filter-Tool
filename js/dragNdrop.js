
/*
** Functionality for dragging and dropping images from local machine on to the page.
*/

$(document).ready(function() {

    let dropzone = $('#droparea');
    uploadBtn = $('#uploadbtn'),
    defaultUploadBtn = $('#upload');
    let imgRef = document.getElementById('img1'); 
    $('#img1').hide();
    
    dropzone.on('dragover', function() {
        //add hover class when drag over
        dropzone.addClass('hover');
        return false;
    });
    
    dropzone.on('dragleave', function() {
        //remove hover class when drag out
        dropzone.removeClass('hover');
        return false;
    });
    
    dropzone.on('drop', function(e) {
        //prevent browser from open the file when drop off
        e.stopPropagation();
        e.preventDefault();
        dropzone.removeClass('hover');

        //retrieve uploaded file data
        var files = e.originalEvent.dataTransfer.files;
        if(files.length == 1)
            processFiles(files);
        else
            console.log('Can only select one file');
        return false;
    });

	uploadBtn.on('click', function(e) {
		e.stopPropagation();
		e.preventDefault();
		//trigger default file upload button
		defaultUploadBtn.click();
	});
	defaultUploadBtn.on('change', function() {
		//retrieve selected uploaded files data
		let files = $(this)[0].files;
		processFiles(files);
		
		return false;
	});
	
    function processFiles(files) {
        //check for browser support 
        if(files && typeof FileReader !== "undefined") {
            //extract FileList as File object
            readFile(files[0]);
        }
        else {
            console.log("Can't read file");
        }
    }

    let readFile = function(file) {
        if( (/image/i).test(file.type) ) {
            //define FileReader object
            let reader = new FileReader();
            //init reader onload event handlers
            reader.onload = function(e) {  
                let image = $('img') // 
                .on('load', function() {         
                })
                .attr('src', e.target.result);
                $('#droparea').hide(); 
                $('#img1').show();  
            };     
            //begin reader read operation
            reader.readAsDataURL(file);
            init(); // initialize filter functions and other buttons
        } else {
            console.log('Wrong file format (image format required)');
        }
    }
	
});