function hide(){

window.timerID =  setInterval(function() {
var aOpaque = document.getElementById('paint').style.opacity;
aOpaque = aOpaque-.1;

aOpaque = aOpaque.toFixed(1);   

document.getElementById('paint').style.opacity = aOpaque;

if(document.getElementById('paint').style.opacity<=0)
clearInterval(window.timerID);
},10000);
}

window.onload = function(){hide();}

try {
  var SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  var recognition = new SpeechRecognition();
}
catch(e) {
  console.error(e);
  $('.no-browser-support').show();
  $('.app').hide();
}


var noteTextarea = $('#termput');
var instructions = $('#log');
var notesList = $('ul#notes');
var mic = document.getElementById('start-record-btn');
var noteContent = '';


/*-----------------------------
      Voice Recognition 
------------------------------*/

// If false, the recording will stop after a few seconds of silence.
// When true, the silence period is longer (about 15 seconds),
// allowing us to keep recording even when the user pauses. 
recognition.continuous = false;

// This block is called every time the Speech APi captures a line. 
recognition.onresult = function(event) {

  // event is a SpeechRecognitionEvent object.
  // It holds all the lines we have captured so far. 
  // We only need the current one.
  var current = event.resultIndex;

  // Get a transcript of what was said.
  var transcript = event.results[current][0].transcript;

  // Add the current transcript to the contents of our Note.
  // There is a weird bug on mobile, where everything is repeated twice.
  // There is no official solution so far so we have to handle an edge case.
  var mobileRepeatBug = (current == 1 && transcript == event.results[0][0].transcript);

  if(!mobileRepeatBug) {
    noteContent += transcript;
    noteTextarea.val(noteContent);
  }
};

recognition.onstart = function() {
  recognizing = true;
  instructions.text('Voice recognition activated. Try speaking into the microphone.');
  mic.src = 'assets/images/mic-animate.gif';
}

recognition.onspeechend = function() {
  instructions.text('You were quiet for a while so voice recognition turned itself off.');
  mic.src = 'assets/images/mic-slash.png'
}

recognition.onerror = function(event) {
  if(event.error == 'no-speech') {
    instructions.text('No speech was detected. Try again.');
	mic.src = 'assets/images/mic.png';
  };
}

/*-----------------------------
      App buttons and input 
------------------------------*/

$('#start-record-btn').on('click', function(e) {
  if (noteContent.length) {
    noteContent = '';
  }
  recognition.start();
});


$('#pause-record-btn').on('click', function(e) {
  recognition.stop();
  instructions.text('Voice recognition paused.')
  noteContent = '';
});

// Sync the text inside the text area with the noteContent variable.
noteTextarea.on('input', function() {
  noteContent = $(this).val();
  return noteContent;
})

$('#save-note-btn').on('click', function(e) {
  recognition.stop();

  if(!noteContent.length) {
    instructions.text('Could not save empty note. Please add a message to your note.');
  }
  else {
    // Save note to localStorage.
    // The key is the dateTime with seconds, the value is the content of the note.
    saveNote(new Date().toLocaleString(), noteContent);

    // Reset variables and update UI.
    noteContent = '';
    renderNotes(getAllNotes());
    noteTextarea.val('');
    instructions.text('Note saved successfully.');
  }
      
})

/*-----------------------------
      Speech Synthesis 
------------------------------*/

function readOutLoud(message) {
	var speech = new SpeechSynthesisUtterance();

  // Set the text and voice attributes.
	speech.text = message;
	speech.volume = 1;
	speech.rate = 1;
	speech.pitch = 1;
  
	window.speechSynthesis.speak(speech);
}

/*-----------------------------
      Helper Functions 
------------------------------*/
function renderNotes(notes) {
  var html = '';
  if(notes.length) {
    notes.forEach(function(note) {
      html+= `<li class="note">
        <p class="header">
          <span class="date">${note.date}</span>
          <a href="#" class="listen-note" title="Listen to Note">Listen to Note</a>
          <a href="#" class="delete-note" title="Delete">Delete</a>
        </p>
        <p class="content">${note.content}</p>
      </li>`;    
    });
  }
  else {
    html = '<li><p class="content">You don\'t have any notes yet.</p></li>';
  }
  notesList.html(html);
}


function saveNote(dateTime, content) {
  localStorage.setItem('note-' + dateTime, content);
}





function deleteNote(dateTime) {
  localStorage.removeItem('note-' + dateTime); 
}

// Called when tick button clicked
function VoiceRun(){
	
        var x = noteContent;
        let a = x.toLowerCase();
		
        // If Command Is Help
        if (a == 'hello') {
			voice_commands();
        }
		// If Command Is Help
		else if (a == '-h') {
			list_commands();
        }
        // If Command Is Dev
        else if (a == 'dev') {
			dev_info();
        }
        // If Command Is Info
        else if (a == 'info') {
			terminal_info();
        }
        // If Command Is nucler_code
        else if (a == 'nucler code') {
			nuclear_code();
        }
        // If Command Is Engage
        else if (a == 'matrix') {
            matrix();
        }
        // If Command Is Show_Date
        else if (a == 'show date') {
            setInterval(time, 1);
        }
		// If Command Is Recursion
		else if (a == 'recursion') {
			recursion();
		}
		// If Command Is Randomize IP
		else if (a == 'random ip') {
			randomize();
		}
		else if (a == 'generate pass') {
			passGen();
		}
		// If Command Is Hack Server
		else if (a == 'hack server') {
			hack();
		}
		// If Command Is cmos_warning
		else if (a == 'system warning') {
			cmos_warning();
		}
		// If Command Is Error 403
		else if (a == 'error 403') {
			error403();
		}
		// If Command Is Error 404
		else if (a == 'error 404') {
			error404();
		}
		// If Command Is Screen Data
		else if (a == 'screen info') {
			screen();
		}
		// If Command Is Browser Data
		else if (a == 'browser data') {
			props();
		}
		// If Command Is Ping
		else if (a == 'ping') {
			ping();
		}
		// If Command Is vsftd_fix
		else if (a == 'fix vsftd') {
			vsftd_ubuntu();
		}
		// If Command Is decrypt_sha2
		else if (a == 'decrypt sha2') {
			decrypt_sha2();
		}
		// If Command Is live_hack
		else if (a == 'live hack') {
			live_hack();
		}
		// If Command Is bruteforce_whitehouse
		else if (a == 'bruteforce whitehouse') {
			bruteforce_whitehouse();
		}
		// If Command Is hack_usa
		else if (a == 'hack usa') {
			hack_usa();
		}
		// If Command Is live_terminal
		else if (a == 'terminal') {
			live_terminal();
		}
		//If Command Is exploit
		else if (a == 'exploit') {
			stage_99();
		}
		//If Command Is msfconsole
		else if (a == 'msfconsole') {
			msfconsole();
		}
		//If Command Is pdnsutil
		else if (a == 'pdns util') {
			pdnsutil();
		}
		//If Command Is android_hack
		else if (a == 'hack android') {
			android_hack();
		}
    
        // If Command Is Undefined
        else {
			var terminaldiv = document.getElementById("terminal");
            terminaldiv.innerHTML = '<i>error detected...</i><br>'+
            '<i>"'+a+'"</i> is an invalid command.<br><br>'+
            'enter <e>"help"</e> or <e>"-h"</e> to see all commands<br>';
        }
    
	}

function voice_commands(){
	var terminaldiv = document.getElementById("terminal");
             terminaldiv.innerHTML = 'Only supported <e>VOICE</e> commands are listed below:<br><br>'+
                '<e>"hello"</e> : see all commands<br>'+
				'<e>"dev"</e> : see code info<br>'+
                '<e>"nucler code"</e> : connect : NSA & steal nuclear code<br>'+
                '<e>"matrix"</e> : show matrix display<br>'+
                '<e>"info"</e> : see Hacker Terminal info<br>'+
                '<e>"show date"</e> : show current time<br>'+
				'<e>"recursion"</e> : run recursion<br>'+
				'<e>"random ip"</e> : randomize your IP<br>'+
				'<e>"generate pass"</e> : show an error looks<br>'+
				'<e>"hack server"</e> : hack a random server<br>'+
				'<e>"system warning"</e> : show an error looks<br>'+
				'<e>"error 403"</e> : see a forbidden function<br>'+
				'<e>"error 404"</e> : see a thing that is not in there<br>'+
				'<e>"screen info"</e> : see screen info<br>'+
				'<e>"browser data"</e> : get browser info<br>'+
				'<e>"ping"</e> : ping google.com<br>'+
				'<e>"fix vsftd"</e> : fix vsftd bug in ubuntu<br>'+
				'<e>"decrypt sha2"</e> : decrypt SHA2 encrypted hash key<br>'+
				'<e>"live hack"</e> : see a hacker live hacking<br>'+
				'<e>"bruteforce whitehouse"</e> : gain access into white house<br>'+
				'<e>"hack usa"</e> : see step by step guide<br>'+
				'<e>"hack android"</e> : see step by step guide<br>'+
				'<e>"live terminal"</e> : see screen mirroring of live hacking<br>'+
				'<e>"exploit"</e> : start stage 99 attack<br>'+
				'<e>"msfconsole"</e> : Exploit CVE-2017-7494 with is_known_pipename Metasploit module <br>'+
				'<e>"pdns util"</e> : Demo of pdnsutil<br>';
}
	

// Auto called on input to terminal
	
function autorun(){
	
        var x = document.getElementById("termput").value;
        let a = x.toLowerCase();
		
        // If Command Is Help
        if (a == 'help') {
			list_commands();
        }
		// If Command Is Help
		else if (a == '-h') {
			list_commands();
        }
        // If Command Is Dev
        else if (a == 'dev') {
			dev_info();
        }
        // If Command Is Info
        else if (a == 'info') {
			terminal_info();
        }
        // If Command Is nucler_code
        else if (a == 'nuclear_code') {
			nuclear_code();
        }
        // If Command Is Engage
        else if (a == 'matrix') {
            matrix();
        }
        // If Command Is Show_Date
        else if (a == 'show_date') {
            setInterval(time, 1);
        }
		// If Command Is Recursion
		else if (a == 'recursion') {
			recursion();
		}
		// If Command Is Randomize IP
		else if (a == 'rand_ip') {
			randomize();
		}
		else if (a == 'pass_gen') {
			passGen();
		}
		// If Command Is Hack Server
		else if (a == 'hack_server') {
			hack();
		}
		// If Command Is cmos_warning
		else if (a == 'cmos_warning') {
			cmos_warning();
		}
		// If Command Is Error 403
		else if (a == 'error_403') {
			error403();
		}
		// If Command Is Error 404
		else if (a == 'error_404') {
			error404();
		}
		// If Command Is Screen Data
		else if (a == 'screen_info') {
			screen();
		}
		// If Command Is Browser Data
		else if (a == 'browser_data') {
			props();
		}
		// If Command Is Ping
		else if (a == 'ping') {
			ping();
		}
		// If Command Is vsftd_fix
		else if (a == 'vsftd_fix') {
			vsftd_ubuntu();
		}
		// If Command Is decrypt_sha2
		else if (a == 'decrypt_sha2') {
			decrypt_sha2();
		}
		// If Command Is live_hack
		else if (a == 'live_hack') {
			live_hack();
		}
		// If Command Is bruteforce_whitehouse
		else if (a == 'bruteforce_whitehouse') {
			bruteforce_whitehouse();
		}
		// If Command Is hack_usa
		else if (a == 'hack_usa') {
			hack_usa();
		}
		// If Command Is live_terminal
		else if (a == 'live_terminal') {
			live_terminal();
		}
		//If Command Is exploit
		else if (a == 'exploit') {
			stage_99();
		}
		//If Command Is msfconsole
		else if (a == 'msfconsole') {
			msfconsole();
		}
		//If Command Is pdnsutil
		else if (a == 'pdnsutil') {
			pdnsutil();
		}
		//If Command Is android_hack
		else if (a == 'android_hack') {
			android_hack();
		}
    
        // If Command Is Undefined
        else {
			var terminaldiv = document.getElementById("terminal");
            terminaldiv.innerHTML = '<i>error detected...</i><br>'+
            '<i>"'+a+'"</i> is an invalid command.<br><br>'+
            'enter <e>"help"</e> or <e>"-h"</e> to see all commands<br>';
        }
    
	}
	
	
function list_commands(){
	var terminaldiv = document.getElementById("terminal");
             terminaldiv.innerHTML = 'all supported commands are below:<br><br>'+
                '<e>"help"</e> : see all commands<br>'+
				'<e>"dev"</e> : see code info<br>'+
                '<e>"nucler_code"</e> : connect : NSA & steal nuclear code<br>'+
                '<e>"matrix"</e> : show matrix display<br>'+
                '<e>"info"</e> : see Hacker Terminal info<br>'+
                '<e>"show_date"</e> : show current time<br>'+
				'<e>"recursion"</e> : run recursion<br>'+
				'<e>"rand_ip"</e> : randomize your IP<br>'+
				'<e>"pass_gen"</e> : show an error looks<br>'+
				'<e>"hack_server"</e> : hack a random server<br>'+
				'<e>"cmos_warning"</e> : show an error looks<br>'+
				'<e>"error_403"</e> : see a forbidden function<br>'+
				'<e>"error_404"</e> : see a thing that is not in there<br>'+
				'<e>"screen_info"</e> : see screen info<br>'+
				'<e>"browser_data"</e> : get browser info<br>'+
				'<e>"ping"</e> : ping google.com<br>'+
				'<e>"vsftd_fix"</e> : fix vsftd bug in ubuntu<br>'+
				'<e>"decrypt_sha2"</e> : decrypt SHA2 encrypted hash key<br>'+
				'<e>"live_hack"</e> : see a hacker live hacking<br>'+
				'<e>"bruteforce_whitehouse"</e> : gain access into white house<br>'+
				'<e>"hack_usa"</e> : see step by step guide<br>'+
				'<e>"android_hack"</e> : see step by step guide<br>'+
				'<e>"live_terminal"</e> : see screen mirroring of live hacking<br>'+
				'<e>"exploit"</e> : start stage 99 attack<br>'+
				'<e>"msfconsole"</e> : Exploit CVE-2017-7494 with is_known_pipename Metasploit module <br>'+
				'<e>"pdnsutil"</e> : Demo of pdnsutil<br>';
}
function dev_info(){
	var terminaldiv = document.getElementById("terminal");
            terminaldiv.innerHTML = 'Developer Info<br>'+
			'********* ****<br>'+
            'Name: <e>GEEKOFIA</e><br>'+
            'Created on: <e>15 June 2018</e><br>'+
            'Languages: <e>HTML, CSS, JS</e><br>';
}
function terminal_info(){
	var terminaldiv = document.getElementById("terminal");
            terminaldiv.innerHTML = 'Terminal Info<br>'+
			'******** ****<br>'+
            'Matrix : <e>type <b>"matrix"</b> and tap enter as many as you want</e><br><br>'+
			'Recursion: <e>type <b>"recursion"</b> and tap enter to get recursion</e><br><br>'+
			'Password Generator: <e>type <b>"pass_gen"</b> and tap enter to generate 8 digit passwords</e><br><br>';
}
function nuclear_code(){
	var terminaldiv = document.getElementById("terminal");
            terminaldiv.innerHTML = 
			'[*]Finding server...<br>'+
			'[*]server IP: 198.43.3.133<br>'+
            '[*]waiting for server response...<br>'+
			'[*]exploiting server...<br>'+
			'<r>[*]Decryping SHA-256 key...<br></r>';
			connection_progress();
        setTimeout(function() {
			var terminaldiv = document.getElementById("terminal");
            terminaldiv.innerHTML = 'server IP: 198.43.3.133<br>'+
            '[*]connecting to server...<br>'+
            '[&#10003;]<e>successfully connected...</e><br>'+
            '[*]Database decrypted successfully...<br>'+
			'[&#10003;]<e>Checking Nuclear code...</e><br>'+
			'[&#10003;]<e>Nuclear code Hijacked</e><br>'+
			'<img src="http://blog.nuclearsecrecy.com/wp-content/uploads/2016/05/Target_List_1956_NSA-600x345.jpg">';
            }, 11000);
}
// Connection Progress Bar
function connection_progress() {
  // Creating Progress Bar
  progConTag = document.createElement('div');
  progBarTag = document.createElement('div');
  progConAttr = progConTag.setAttribute('id', 'progCon');
  progBarAttr = progBarTag.setAttribute('id', 'progBar');
  document.getElementById("terminal").appendChild(progConTag);
  document.getElementById("progCon").appendChild(progBarTag);
  
  // Setting Progress Bar Holder
  con = document.getElementById("progCon");
  con.style.width = 'calc(100% - 2px)';
  con.style.height = '20px';
  con.style.background = 'transparent';
  con.style.border = '1px solid #0e0';
  
 // Setting Progress Bar
  bar = document.getElementById("progBar");
  bar.style.width = '100%';
  bar.style.height = '20px';
  bar.style.background = '#0e0';
  bar.style.webkitAnimation = 'loader 5s linear 1';
  bar.style.animation = 'loader 10s linear 1';
}
// Matrix Rain Display
function matrix() {

  // Creating Canvas
  canvasTag = document.createElement('canvas');
  canvasAttr = canvasTag.setAttribute('id', '_canvas_');
  document.getElementById("terminal").appendChild(canvasTag);
  
  // Setting Canvas
  cvs = document.getElementById("_canvas_");
  pen = cvs.getContext('2d');

  cvs.height = (window.innerHeight*2)-200;
  cvs.width = window.innerWidth;
  cvs.style.position = 'absolute';
  cvs.style.top = '0';
  cvs.style.left = '0';

  // Setting Text
  num = 'あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもらりるれろやゆよわをんがぎぐげござじずぜぞだぢづでどばびぶべぼぱぴぷぺぽ';
  size = 10;
  num = num.split('');
  columns = cvs.width/size;
  mtrx = [];
  
  for(x=0; x<columns; x++) {mtrx[x] = 1}

  // Drawing Matrix
  function draw() {
    pen.fillStyle = 'rgba(18,18,18,.1)';
    pen.fillRect(0, 0, cvs.width, cvs.height);
    pen.fillStyle = '#00e';
    pen.font = size+'px courier';
    
    for(i= 0; i<mtrx.length; i++) {
      text = num[Math.floor(Math.random()*num.length)];
      pen.fillText(text, i*size, mtrx[i]*size);
      
      if (mtrx[i]*size > cvs.height && Math.random() > 0.975)
        {mtrx[i] = 0}
      mtrx[i]++;
    }
  }
  
  // Calling Matrix
  setInterval(draw, 50);
}
// Show Current Time
function time() {
  // Creating Clock
  dateTag = document.createElement('span');
  dateAttr = dateTag.setAttribute('id', 'date');
  document.getElementById("terminal").appendChild(dateTag);
  
  // Getting Time Data
  now = new Date();
  yy = now.getFullYear();
  mm = now.getMonth();
  dd = now.getDate();
  ho = now.getHours();
  mi = now.getMinutes();
  se = now.getSeconds();
  
  // Setting Time Data
  month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'Desember'];
  
  month = month[mm];
  
  ho = ho<10 ? '0'+ho: ho;
  mi = mi<10 ? '0'+mi: mi;
  se = se<10 ? '0'+se: se;
  
  // Outputting Time Data
  document.getElementById("date").innerHTML = '<br><br><br><e>'+ho+':'+mi+':'+se+', '+dd+' '+month+' '+yy+'</e>';
}
// Recursion
function recursion() {
  var terminaldiv = document.getElementById("terminal");
            terminaldiv.innerHTML = '...<br>';
  setTimeout(function() {
    var terminaldiv = document.getElementById("terminal");
            terminaldiv.innerHTML += '<i>failed to execute command</i><br>';
  }, 1000);
  setTimeout(function() {
    var terminaldiv = document.getElementById("terminal");
            terminaldiv.innerHTML += 'did you mean recursion ?<br>';
  }, 1500);
  setTimeout(function() {
    var terminaldiv = document.getElementById("terminal");
            terminaldiv.innerHTML += 'if yes, type <e>"recursion"</e> and tap enter';
  }, 2000);
}
// Randomize IP
function randomize() {
  ip1 = Math.ceil(Math.random()*230);
  ip2 = Math.ceil(Math.random()*210);
  ip3 = Math.ceil(Math.random()*210);
  ip4 = Math.ceil(Math.random()*127);
  ip = ip1+'.'+ip2+'.'+ip3+'.'+ip4;
  
  var terminaldiv = document.getElementById("terminal");
            terminaldiv.innerHTML = '[*]randomizing IP...<br>';
  setTimeout(function () {
    var terminaldiv = document.getElementById("terminal");
            terminaldiv.innerHTML += '[&#10003;]IP randomized<br>';
  }, 2000);
  setTimeout(function () {
    var terminaldiv = document.getElementById("terminal");
            terminaldiv.innerHTML += '[&#10003;]your new IP: <e>'+ip+'</e>';
  }, 2500);
}

// Error
function cmos_warning() {
  var terminaldiv = document.getElementById("terminal");
            terminaldiv.innerHTML = '<i>error detected...</i><br>'+
  '<img src="https://media.giphy.com/media/rF65YgOYHsjVm/giphy.gif"><br>';
}

// Error 403
function error403() {
  var terminaldiv = document.getElementById("terminal");
            terminaldiv.innerHTML = '<div align="center">'+
			'<r>Fuck !!</r><br>'+
			'<img src="https://dj-extensions.com/images/403-_you_are_not_authorized.png">'+
			'</div>';
}

// Error 404
function error404() {
  var terminaldiv = document.getElementById("terminal");
            terminaldiv.innerHTML = '<div id="parallax_wrapper" align="center">'+
      '<div id="parallax_illustration">'+
        '<div id="auth"></div>'+

        '<img alt="404 “This is not the web page you are looking for”" class="js-plaxify" data-xrange="20" data-yrange="10" id="parallax_error_text" src="data:image/png;base64,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" style="top: 72px; left: 72px; transform: translate3d(9.8351px, -2.10944px, 0px);" width="271" height="249">'+

        '<img alt="" class="js-plaxify" data-xrange="10" data-yrange="10" id="parallax_octocat" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAALwAAADmCAMAAABYgh8IAAAAA3NCSVQICAjb4U/gAAABgFBMVEX///9SOCxSOjH/wp8AAAD+wJ4ICAhWPjL/7tDMQjj////66834vZuZmZmVcl+bdmN7KCIxIRr39/dUQjpRS0nFQjhKMihptaVQRUEzJyAyIx46KSF8LSdAKyJSOCxUQjqcincQEBBSOjFSOjHzp4tSOCz/xqZSOjFkTEBUQjpSOjG7qJP/+PQpHhpSOjFSOjH87+jz4cRqUURDMSlTSURQRUFUQjr/1r//0bAaEg9UQjqHZFL/59nOTENTSURSOCyNfGojGhddV0wpKSnGl3yWlJKUh3d4YlM5OTkQEBDez7fLvKWdj4hzW0xIQj/05+bbp4nWZlZTSURTSURSOjFSOjHo17yMgn5+bFwZLSlWPjL358v/4sL5w6XWxKyJcmF3VkYhFxIzMzP86MynnIi1jHRXmYwhISEYGBhSOCwICAj50rvehn+SblqRMClWPjIICAgAAACLZWJAa2I2XVRRS0kQEBBUQjpLOC/xt5blqqWvhnBNh3spRD4ICAhWPjKmNNozAAAAgHRSTlMA////////////////////////RBH///8i///////uZv//d4j/3f+q/1WZ////Zrv/////IjN3////M////zPM//8RM/////8RiP////8R////EUTM7v////+7/////////yL/////RGa73f////+q7u7///8id5mq//////+q7kFCNkwAAAAJcEhZcwAACxIAAAsSAdLdfvwAAAAcdEVYdFNvZnR3YXJlAEFkb2JlIEZpcmV3b3JrcyBDUzQGstOgAAAgAElEQVR4nMVdh0PUyBo32U2C7gLC0vvCozcBQREbFlTUs/feFfXOe/q84on/+pv2lZkkm6x3nCNuSzL5zTe/r8zMl2TXrsTSNrny2/z8+PBgZX/yDv9e6Tp6rXKongMGPV0i+TI+eXWngGWUrsmpGxrGt2u5DxrxfIPel3++d2ywbQcxJpa2ym8DHit5hV9B6JGvP/q+P145saNgrdJWmcKeV/LzvBs5xXfds4togUDvfRv5l/hf+c3Xvc763/NWch3b5bFjtOhNB3jjR3cY965dhzTN7aJ0L5fo57CxrPHw4Vh+zfke5ILnvoNZ/+BH3mSeGqboCHV8RE2R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" style="top: 94px; left: 356px; transform: translate3d(4.91755px, -2.10944px, 0px);" width="188" height="230">'+

        '<img alt="" class="js-plaxify" data-xrange="10" data-yrange="10" id="parallax_speeder" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAbgAAACcCAMAAAA6Xk4VAAAAA3NCSVQICAjb4U/gAAADAFBMVEX///9NmcCTfmuUe2OQd2KMdWGGcFqEbVqEa1JNmcCbhGucf2ibhGucf2iUe2NHhaiQd2KfinFJm8ajhWubhGucf2iDeW2Qd2KBdmuMclqKbllzYExJm8ajhWubhGucf2iMclqKbllJnctEnMubhGucf2icfWKQd2JChaxJnctEnMujhWubhGuegWWcf2iQd2KjhWubhGuegWWcf2iUe2OMclqKbllIodGjhWubhGuegWWUe2OMclpEpNdBoNOnimujhWuegWWUe2M8iriMclpsWkhDp92ljXOnimujhWulhGSegWWcfWKUe2M4i76VeF2Uc1mMclqOb1NCq+FDp92tjXCnimujhWulhGQyi8WMclpPrdxLrN1Cq+FAquM9quM/qOOvkG87peCtjXCtjGunimuqh2o2n9ujhWurhGSlhGQ2ltKcfWIvktAvjs0yi8Uqi8sticWUc1mTcVRpUkJkUUFardVTrdhPqNSvkG+yj3CtjGutiWenimuqh2qrhGSegWWcfWIyi8UxiL+Uc1m9poq9pIa1nYJgrdNirNBardVqqsezmn2wmX5aqtCVnZWtlXq0k3NapMxTps+sk3a0kW6yj3CvkG+zjmymkXZTositjGuljXNSncOtiWdQm7+nimuqh2qfinFNmcCrhGSchnOjhWtQlrx5jpGlhGSbhGuUhHWegWWmfmGcf2iMgniVgW2ifF2cfWKTfmtIjrVCjLSceluUe2ODfnhAiLeVeF2PemR6enqQd2I7h7qZdFlChayUc1mMdWE6hbZ0eXw6g6+TcVSMclqOb1M6gKaGcFpqdX2KblmMa1OEbVphc4GEa1JecX+EaE4yeaKDZk98aFSDZEwxdJ5RbYF5ZFJ7YkswcJZ1YU9DaoN5XklzYEwubJN0XEkpapM5ZYFzWUNsWkhrV0MzYX8tX35pUkJoUj5kUUEpXH1jTzxgTj9hTDpbSjpRQjZSQjNMPzNLPDFHOS1CODBENyxANCs9NC86MCo3LSgwKSktJycvJyUrJCR/7i4wAAABAHRSTlMAEREREREREREiIiIzMzMzM0REREREREREREREVVVVVVVVZmZmZmZmZnd3d3d3d3eIiIiIiIiImZmZmZmZqqqqqqqqqqqqu7u7u7u7u7u7u7u7u8zMzMzMzMzM3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d7u7u7u7u7u7u7u7u7u7u////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////WBVVlgAAAAlwSFlzAAALEgAACxIB0t1+/AAAABx0RVh0U29mdHdhcmUAQWRvYmUgRmlyZXdvcmtzIENTNAay06AAACAASURBVHic7Z0LYFtl2ce7DS8MxsdgE0VwoOxTUWFsMHCICKKuXJSbOoG0xSGKjG0OAbmo3NwYKDbYnKWkBjsGmtoOEyXIGNRUvrVOOktpCy2jI5hmTbuypDljY03p97z39z3nJM2lJIPmaZqce855f+f/XN5zkpSUHBB20OzZcxacsuCURaWlpYtgYPbsaYXepaKlsumfWHBO6Q9+5LKyH5R+fkah969oZptx0jnf/YUlMcl+fsHcQu9n0bhNnbOg9Ae14zEjtsFz57kfKPQOFw10tmB8mQmr9SC788wiuoLa1LnnZAANDGPzBNpfWHV4ofd98tqMLy7JCBrj9kI0FtP1gYWF3v9JaVPnlv48U2rUTwZjcV2P6/Ho8YU+iMlns865PXNqLpcbc9P1WDyO4A1/vNDHMcns89ZF2viGuLWD2PS9+/fpMdBcoY9kUtmcLFykAOcHXvrIWCIxsgcGvlbog5lEdkrW2LDgQroO3MbGRscSe8BZFvpoJo/NzZ4binB+SEv2AbWxxNjY28CwKLk82fTMqjbFUErZAwEOmCFLjAG43YU+oMlipdlzQ56yfliPv4X8JLb9QK6YWObFDsuBGwLXoseGEwkc4ZC7LPrKfNlXcuCGQtx2Pb4HgCVGsbsc3avrNxX6kCaH3ZEjuKGYvo85SnjZH48VS7l82Cdy4IZzk1h8+O3RUUINnOXIcFz/cKEPajLYolzAbYBiIK7H9icgn0wkcIwbgRq8mJ3kwc7PBRy6mhOP6YgbqQbAYvF4MTvJg2XbR8nAtUH5jZJKym5sbE8xrcyLZd9LScC1AzhwkaOjOMSNjo3u0eM/LfRBTQbLodsEg+vS43Ge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" style="top: 150px; left: 432px; transform: translate3d(4.91755px, -2.10944px, 0px);" width="440" height="156">'+

        '<img alt="" class="js-plaxify" data-xrange="10" data-yrange="10" id="parallax_octocatshadow" src="data:image/png;base64,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" style="top: 297px; left: 371px; transform: translate3d(4.91755px, -2.10944px, 0px);" width="166" height="49">'+

        '<img alt="" class="js-plaxify" data-xrange="10" data-yrange="10" id="parallax_speedershadow" src="data:image/png;base64,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" style="top: 263px; left: 442px; transform: translate3d(4.91755px, -2.10944px, 0px);" width="430" height="75">'+

        '<img alt="" class="js-plaxify" data-invert="true" data-xrange="50" data-yrange="20" id="parallax_building_1" src="data:image/png;base64,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" style="top: 73px; left: 467px; transform: translate3d(-24.5878px, 4.21888px, 0px);" width="304" height="123">'+

        '<img alt="" class="js-plaxify" data-invert="true" data-xrange="75" data-yrange="30" id="parallax_building_2" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHQAAAAyCAMAAAC6RQ9kAAAAA3NCSVQICAjb4U/gAAABgFBMVEX////kyZm1pIDexpr73qqnmnallnGnmnn33aqjlXn12anszpi7p4PUvZPu1aXPuo6tm3zr0aLfxZbNt4xxbWOUim6yn3l7c2NsaF2+rIStm3yom4C2o3v22KSznW+rnIGejGuqlm3ZxJZxbWN0bFvUvZPv0JvnzZ2MfmPArYq7p4PXvo7Qu5LFsoq+rIRsaWDx057ErYKznXCsmnKFe2qom4CPgWSMhG3Qu5Kck3OllnGjlXl7c2NzcGeJf217c2OJf23FsoqUim6+rISck3PArYp/eWl/eGWfknrGsIzArYrGsIyck3PNt4zXvo67p4Pr0aLQu5K7p4Omk2zfxZbZxJbErYL12anu1aWwm2753KfmzaHny5aMg3N/eWmfknqajnmUiXSMhG2Mg3OrnIGjlXmUim6UiXSMhG2EeGN/eGW1pICajHOFe2rGsIy7p4OVhme+rIStm3ynmnmejGuUim6VhmfUvZPQu5LNt4zexprPuo7GsIy7p4Oyn3mmk2w+/MV0AAAAgHRSTlMA////////////////////RP///yJ3/yIR7v9E////RHe7/xEiu///RHfu/////xH/////IjNEVaqqzMwRESIzVXeIu8zdIiIzZmZ3d4iZqru7u7vM3d3u7u7///8RESIiIiIiMzMzMzMzM0RERFVVVWZmZmZmZnd3d4iIiIiIiOmar1cAAAAJcEhZcwAACxIAAAsSAdLdfvwAAAAcdEVYdFNvZnR3YXJlAEFkb2JlIEZpcmV3b3JrcyBDUzQGstOgAAAFzUlEQVRYheWXh3saRxDFvSzHHQsczUEKCFVkiINKFEW25RZFcVwjJFvNTu+99+p/PfNmCwfcxYosf8n3ZcB3gjvv797sm9nl1KlHxNyjbngCMf7U/wU6929Al/5L6X3nq43f5ud/uf3ZpScARXp/GB/68q1fD4IHYXP5TC73em731psnDYXS9dMDX729nVZBmkIpVc4hXr188tCLA9CfAiIqftM/1WwTda90otC5IeilbahkoYAG9Ocyiz1J6JDSNw41Kg0wvRTOTVC3HgvzwcbG7ZJrfoNKLx8qTms6IBxT+cPyY1JvHqgmxrhlPpPSq54rm21WyFyXZDzGGVC/OSby8jYP1KRBdq9Y6Dnvgrn8cwACZRc+4rklU8FXIZv4xvGg20qLeEDUPS576kjnfAN9D5cUpxZYfeJsa6m7x2J+CSIkBCFV/ZaFWqVbSrtI6dwq7SjODc9q7liFc2Dmyzw6EtxP71IjDKkdNFUzRDT5tkDBUUobOLd3VND46urqjQZi6mYYlsvl18oIQbE3T1ERUkiEwEngjIOsdrvdgrQx+yzHt6c5xuil3wlbgBJGEGY0Gk84hP4k+idh+PxnPnWkGIuH2tG0AIvQWAsXRqFRiy+OxkyE2oGlyd+wPP1IfeE6wSeh9B/nmKB5sZjJZjNeDGuh6lPUk6BTFiVdIqWFWqR0avsZZ2g1m6FXDLRYoQuZzEQSVESsaU/mi7JyEepTwE0+VRBaaYFGzmYnYqCyhku11PUE9zrvGJ3WREKG6HFK2TVFVyadU1QrZwGVkENDx0AXAa0nKG1EjCP7J6GhKtrfbc8LSKnQ0BryW4+DVmm2s36yewct5GZXitB2HTR2dEDu8RGoWMTQMU4qigIm1fu7khGuTI179JGgQdgut8t4604VmPQyVEp2UiYOWskiUq8kuFdGKlVEfCpIaaAqvud7nufjQEdu9TCSTm8BRopxUlGIOl3K1BJLpl9+ItJ96HOZUlohlIei8/lsoNLMqcwgRieVoHlUUz1Jqe0xwprWaQ9p/maZCJUsNTBGkk9zekUd/vVjoLKKx/ET5nTAvJFlRDA0XdEwpBYH3hxFoIsYetRJRYnM05Vk90a7jssul0w6PWs1cnY9Lhq4l6GCe1J21EmktMKN49MEaH9FkW4N0U8CaMVmVx8HoHQXehLa3YhS1DDFF/Fz6tqsNGDhHMVQdq5v0F6gTMmY9FbYSSM9qYglAdAXE+bUrcvWSq4Xc3p1Xi03MEp5TnFXHe1hxL7kXrmAJLyUlN74zoD0kqxZrdTTZcolo1Jdo1Swk2JWNygt4HFeToQKl1jhVlL8UQ44vWwi0yK4H0bcK6qZOCeRUvQkkjr8M9Ok15VLZLXWSTbu1Rq1XOx3AzunuJF70oiTihisjiXoagK0vzFxD6C1a/faKuUU87LjoLg51kmYU3EWUmOdVLIrdv9g9i5Up0rXqe/Anu1ITinpyY42wiJG7QEa66TSYOeLFKwQ5XSkI+l5xZIe9N1Lt+f1GjYYVYxyHnMa66RGZF9m59WuqrTKaCMZmb5Lr1OKHouxR5XSZh3GjnXSFEtsi3a7uLCwsNi1WnkRV1hlTHK1YGxbVBTKq/WIk4qcrIvwWJyTplgdpqrKeYn2f1ZqSlRn1+efiYBeM0YSet835KQip60HaJyTuGQkVkkNjW7RsHOoGBsZrdit8Mbsmq5TGe+kIruil9STSvwf006pbUnOSEaibQ7YKFml2m55bB6GnFTkx95BocY5SdcpulvV2s71ClunFurbOe0KuW96r+mx2WEoHmcWNZOdmZ5e61xvRaFLq+/Sr8TzFH/82bt7t/cMx+87O/Qzcffw8HBPNyTdgP2+e/eNUikK3O5qE4iaifxziOrziJWVyZVJxPrMw+mvO5+0YjtjUlz56MOPX6B4//NSo/HdnTvf9zY3N3u9/fX19Xv37k9i6JXJ+zMcF6Y5fux01tY6a51WqzXWcrS/AGShj5noGrZMAAAAAElFTkSuQmCC" style="top: 113px; left: 762px; transform: translate3d(-37.3816px, 6.32832px, 0px);" width="116" height="50">'+
      '</div>'+

    '</div>';
}
function passGen(){
		let length = 8;
		let chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
		let password = '';
			for (let i = 0; i < length; i++) {
				let rnum = Math.floor(Math.random() * chars.length);
				password += chars.substring(rnum,rnum+1);
			}
		var terminaldiv = document.getElementById("terminal");
            terminaldiv.innerHTML = '<e>'+
			'<r>Your Generated Password is </r>: '+password+'</e>';
}
// Hack Server

// Screen
function screen() {
  document.getElementById("terminal").innerHTML = 'getting screen info...<br>';
  setTimeout(function (){
    document.getElementById("terminal").innerHTML += '<e>screen info successfully gotten.</e><br><br>';
  }, 1500);
  setTimeout(function (){
    document.getElementById("terminal").innerHTML += 'available height: <e>'+window.screen.availHeight+'px</e><br>';
  }, 2000);
  setTimeout(function (){
    document.getElementById("terminal").innerHTML += 'available width: <e>'+window.screen.availWidth+'px</e><br>';
  }, 2500);
  setTimeout(function (){
    document.getElementById("terminal").innerHTML += 'total height: <e>'+window.screen.height+'px</e><br>';
  }, 3000);
  setTimeout(function (){
    document.getElementById("terminal").innerHTML += 'total width: <e>'+window.screen.width+'px</e><br>';
  }, 3500);
  setTimeout(function (){
    document.getElementById("terminal").innerHTML += 'color depth: <e>'+window.screen.colorDepth+'</e><br>';
  }, 4000);
  setTimeout(function (){
    document.getElementById("terminal").innerHTML += 'color resolution: <e>'+window.screen.pixelDepth+'</e><br>';
  }, 4500);
}

// Properties
function props() {
  document.getElementById("terminal").innerHTML = 'getting browser info...<br>';
  setTimeout(function (){
    document.getElementById("terminal").innerHTML += '<e>browser info successfully gotten.</e><br><br>';
  }, 1500);
  setTimeout(function (){
    document.getElementById("terminal").innerHTML += 'browser name: <e>'+navigator.appName+'</e><br>';
  }, 2000);
  setTimeout(function (){
    document.getElementById("terminal").innerHTML += 'version info: <e>'+navigator.appVersion+'</e><br>';
  }, 2500);
  setTimeout(function (){
    document.getElementById("terminal").innerHTML += 'cookies enabled: <e>'+navigator.cookieEnabled+'</e><br>';
  }, 3000);
  setTimeout(function (){
    document.getElementById("terminal").innerHTML += 'browser language: <e>'+navigator.language+'</e><br>';
  }, 3500);
  setTimeout(function (){
    document.getElementById("terminal").innerHTML += 'browser is online: <e>'+navigator.onLine+'</e><br>';
  }, 4000);
  setTimeout(function (){
    document.getElementById("terminal").innerHTML += 'platform: <e>'+navigator.platform+'</e><br>';
  }, 4500);
  setTimeout(function (){
    document.getElementById("terminal").innerHTML += 'browser engine: <e>'+navigator.product+'</e><br>';
  }, 5000);
  setTimeout(function (){
    document.getElementById("terminal").innerHTML += 'user-agent header: <e>'+navigator.userAgent+'</e><br>';
  }, 5500);
}
function ping(){
	  
		url = "google.com"
		ping = new XMLHttpRequest();    
		ping.onreadystatechange = function(){

    var terminaldiv = document.getElementById("terminal");
             terminaldiv.innerHTML = '</br> Ping is ready<br>' + 
			 'Ready State: <e>'+ping.readyState+'</e><br>'+
			 'Status: <e>'+ping.status+'</e><br>';

    if(ping.readyState == 4){
        if(ping.status == 200){
            result = ping.getAllResponseHeaders();
            document.getElementById("terminal").innerHTML += '</br>' + result + '</br>'+
			'Status Text: <e>'+ping.statusText+'</e><br>'+
			 'Response Text: <e>'+ping.responseText+'</e><br>';
        }
    }

}
ping.open("GET", url, true);    
ping.send();
}
function vsftd_ubuntu(){
	var terminaldiv = document.getElementById("terminal");
             terminaldiv.innerHTML = '<br>'+
			 '<img src="https://media.giphy.com/media/10WMtHqk4zfSow/giphy.gif">'+ 
			 '<br>';
}
function decrypt_sha2(){
	var terminaldiv = document.getElementById("terminal");
             terminaldiv.innerHTML = '<br>'+
			 '<img src="https://i.gifer.com/758Y.gif">'+ 
			 '<br>';
}
function live_hack(){
	var terminaldiv = document.getElementById("terminal");
             terminaldiv.innerHTML = '<br>'+
			'<iframe src="gifs/live_hacking.gif" scrolling="no" frameborder="0" width="100%" height="100%" ></iframe>'+
			'<br>';
}
function bruteforce_whitehouse(){
	var terminaldiv = document.getElementById("terminal");
             terminaldiv.innerHTML = '<br>'+
			'<iframe src="gifs/bruteforce.gif" scrolling="no" frameborder="0" width="100%" height="100%" ></iframe>'+
			'<br>';
}
function android_hack(){
	var terminaldiv = document.getElementById("terminal");
             terminaldiv.innerHTML = '<br>'+
			'<iframe src="gifs/android_hack.gif" scrolling="no" frameborder="0" width="100%" height="100%" ></iframe>'+
			'<br>';
}
function live_terminal(){
	var terminaldiv = document.getElementById("terminal");
             terminaldiv.innerHTML = '<br>'+
			'<iframe src="gifs/full_terminal.gif" scrolling="no" frameborder="0" width="100%" height="100%" ></iframe>'+
			'<br>';
}
function decrypt_sha2(){
	var terminaldiv = document.getElementById("terminal");
             terminaldiv.innerHTML = '<br>'+
			'<iframe src="gifs/decrypt_sha2.gif" scrolling="no" frameborder="0" width="100%" height="100%" ></iframe>'+
			'<br>';
}
function hack_usa(){
	var terminaldiv = document.getElementById("terminal");
             terminaldiv.innerHTML = '<br>'+
			'<iframe src="gifs/hack_usa.gif" scrolling="no" frameborder="0" width="100%" height="100%" ></iframe>'+
			'<br>';
}
function stage_99(){
	var terminaldiv = document.getElementById("terminal");
             terminaldiv.innerHTML = '<br>'+
			'<iframe src="gifs/stage_99.gif" scrolling="no" frameborder="0" width="100%" height="100%" ></iframe>'+
			'<br>';
}
function msfconsole(){
	var terminaldiv = document.getElementById("terminal");
             terminaldiv.innerHTML = '<br>'+
			'<iframe src="gifs/msfconsole.gif" scrolling="no" frameborder="0" width="100%" height="100%" ></iframe>'+
			'<br>';
}
function pdnsutil(){
	var terminaldiv = document.getElementById("terminal");
             terminaldiv.innerHTML = '<br>'+
			'<iframe src="gifs/pdnsutil.gif" scrolling="no" frameborder="0" width="100%" height="100%" ></iframe>'+
			'<br>';
}

function hack() {

  hackText = 'I_n_i_t_i_a_l_i_z_i_n_g_._._._<br>'+
    '_<e>Done.</e>_&nbsp_&nbsp_&nbsp_<br>'+
    '_L_o_a_d_i_n_g_ _I_n_t_e_r_f_a_c_e_._._._<br>'+
    '_C_o_l_l_e_c_t_i_n_g_ _D_a_t_a_._._._<br>_<br>'+
    '_Decrypting_ _Data..._<br>'+
    '_F_l_o_o_d_i_n_g_ _S_e_r_v_e_r_._._._<br>'+
    '_Connecting..._\n_\n_\n_\n_\n_\n_<br>'+
    'I_n_i_t_i_a_l_i_z_i_n_g_ _P_a_t_c_h_e_s_._.'+
    '_\n_\n_\n_\n_\n_\n_\n_\n_\n_\n_\n_<br>'+
    '_ A_u_t_h_e_n_t_i_c_a_t_i_n_g_._._<br>'+
	'_ C_a_p_t_u_r_i_n_g_ _H_a_n_d_s_h_a_k_e_._._<br>'+
    '_Obtaining Keypass.._<br>_<e>Connection Successful.</e>_<br>_<br>'+
    '_Redirecting..._\n\n_\n_\n_\n_\n_\n_\n_\n_\n_\n_<br><br>'+
    '_Server_ _Diagnostics_:_<br>IP_:_ _<e>172.217.161.14</e>_<br>'+
    '_Gateway_:_ _<e>225.225.0.0_ _</e>_ _>><e>Flags_ _<e>up</e>_<br>'+
	'_DNS_:_ _<e>8.8.8.8</e>_<br>'+
    '_Server_Address_:_ _<e>google.com</e>_<br>'+
	'_ A_u_t_h_e_n_t_i_c_a_t_i_n_g_ _ D_a_t_a_b_a_s_e_._._._._._<br>'+
    '_Username_:_ _<e>sunpichai@69</e>_<br>'+
    '_Password_:_ <e>**********</e><br>'+
	'_ L_o_g_g_i_n_g_ _ I_n_._._._.<br>'+
	'<br>'+
	'_ <e>SUCCESS !</e>';
    
  hackText = hackText.split("_")
  count = 0;
	var terminaldiv = document.getElementById("terminal");
             terminaldiv.innerHTML = '';
  
  function startTyping(){
    var terminaldiv = document.getElementById("terminal")
     
    if (count >= hackText.length) {
      clearInterval(typing);
    }
    else {
      terminaldiv.innerHTML += hackText[count];
      count++;
    }
  }
  typing = setInterval(startTyping, 100);
}