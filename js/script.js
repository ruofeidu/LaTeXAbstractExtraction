function Trim(str) {
	return str.trim().replace(/[\r\n\s]/g,"");
}

function Analyze(a) {
	var res = a.trim();
	// begin re_abstract
	var re_abs = /\\begin\{.+\}(.+)\\end\{.+\}/gm;
	var match = re_abs.exec(res);
	if (match && match[1]) {
		res = match[1];
	}

	// ieee \re_abstract
	re_abs = /\\re_abstract{(.+)}/gm;
	match = re_abs.exec(res);
	if (match && match[1]) {
		res = match[1];
	}
	
	// latex symbols
	res = res.replace(/\\degree/g, "°");
	res = res.replace(/\\etal/g, "et al.");
	// comments
	res = res.replace(/([^\\]|^)%.+/gm, ""); // Fixed for Firefox
	// emph
	res = res.replace(/\{\\\w+/gm, "").replace(/\\\/\}/g, "");
	// textit, $, and ~
	res = res.replace(/\\\w+{/gm, "").replace(/[\}\$]/g, "").replace(/\~/g, " ");
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



