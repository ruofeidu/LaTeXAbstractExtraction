var LEN = 20; 
var MIN_RATIO = 0.45; 
var MAX_RATIO = 0.55; 
var PERFECT_RATIO = 0.5;

function Update() {
	LEN = $("#query").val(); 
	MIN_RATIO =  (parseInt($("#min_ratio").val())) / 100; 
	MAX_RATIO =  (parseInt($("#max_ratio").val())) / 100; 
	PERFECT_RATIO = (parseInt($("#perfect_ratio").val())) / 100; 
	$('#in_a').val( $('#in_a').val().toUpperCase() );
	$('#in_b').val( $('#in_b').val().toUpperCase() );
}

function UDChar(ch) {
	var ans = '';  
	if (ch == 'A') {
		ans = 'T'; 
	}
	else if (ch == 'T') {
		ans = 'A'; 
	}
	else if (ch == 'U') {
		ans = 'A'; 
	}
	else if (ch == 'C') {
		ans = 'G'; 
	}
	else if (ch == 'G') {
		ans = 'C'; 
	}
	return ans; 
}

function Trim(str) {
	return str.trim().replace(/[\r\n\s]/g,"");
}

function UpsideDown(str){
	str = Trim(str);
	var ans = ""; 
	var n = str.length; 
	for (var i = 0; i < n; ++i) ans = ans.concat(UDChar(str[n-i-1]));
	return ans;  
}

function Analyze(a) {
	var res = a.trim();
	// begin abstract
	var abs = /\\begin\{.+\}(.+)\\end\{.+\}/gs;
	var match = abs.exec(res);
	if (match && match[1]) {
		res = match[1];
	}

	// ieee \abstract
	abs = /\\abstract{(.+)}/gs;
	match = abs.exec(res);
	if (match && match[1]) {
		res = match[1];
	}
	
	// latex symbols
	res = res.replace(/\\degree/g, "°");
	res = res.replace(/\\etal/g, "et al.");
	// comments
	res = res.replace(/(?<!\\)%.+/g, "");
	// emph
	res = res.replace(/\{\\\w+/gs, "").replace(/\\\/\}/g, "");
	// textit, $, and ~
	res = res.replace(/\\\w+{/gs, "").replace(/[\}\$]/g, "").replace(/\~/g, " ");
	// double white spaces
	res = res.replace(/\n/g, " ");
	res = res.replace(/\s\s+/g, " ");
	
	// \% percentage
	res = res.replace(/\\\%/g, "%");
	res = res.trim(); 
	return res; 
}

$(document).ready(function() {
	$("#in_a").mouseover(function(){
		$(this).select();
	});

	$("#out").mouseover(function(){
		$(this).select();
	});

	$('#analyze').click(function(){
		$('#out').val(Analyze($('#in_a').val())); 
	}); 
	
	$('#in_a').keyup(function(){
		$('#out').val(Analyze($('#in_a').val())); 
    });
	
	$('#analyze').click();
});



