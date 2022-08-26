'use strict';

function Trim(str) {
  return str.trim().replace(/[\r\n\s]/g, '');
}

function WordCount(str) {
  return str.split(' ').length;
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

  // citations
  res = res.replace(/\\cite\{[\w\d,:]+\}/g, '');
  res = res.replace(/\\ref\{[\w\d,:]+\}/g, 'X');
  res = res.replace(/\\begin\{[\w\d,:]+\}\[.+\]/g, '');
  res = res.replace(/\\end\{[\w\d,:]+\}/g, '');
  res = res.replace(/\\label\{[\w\d,:]+\}/g, '');
  res = res.replace(/\\centering/g, '');
  res = res.replace(/\\caption/g, '');
  res = res.replace(
      /\\includegraphics[\[\w\d\,\.\:\=\/\\]+\]\{[\w\d,\.\:\/\\\_]+\}/g, '');

  // latex symbols
  res = res.replace(/\\degree/g, '°');
  res = res.replace(/\\times/g, '×');
  res = res.replace(/\\etal/g, 'et al.');
  res = res.replace(/``/g, '"');
  res = res.replace(/""/g, '"');
  res = res.replace(/ \./g, '.');

  // comments
  res = res.replace(/([^\\]|^)%.+/gm, '');  // Fixed for Firefox

  // emph and italics
  res = res.replace(/\{\\\w+/gm, '').replace(/\\\/\}/g, '');

  // textit, $, and ~
  res = res.replace(/\\\w+{/gm, '').replace(/[\}\$]/g, '').replace(/\~/g, ' ');
  res = res.replace(/\\sim/g, '~');

  // double white spaces
  res = res.replace(/\n/g, ' ');
  res = res.replace(/\s\s+/g, ' ');
  res = res.replace(/([\.,])(\s)([\.,])/g, '$1$3');

  // \% percentage
  res = res.replace(/\\\%/g, '%');
  res = res.trim();

  $('#words').html('Count: ' + WordCount(res) + ' words');
  return res;
}

$(document).ready(function() {
  $('#in_a').mouseover(function() {
    $(this).select();
  });

  $('#out').mouseover(function() {
    $(this).select();
  });

  $('#analyze').click(function() {
    $('#out').val(Analyze($('#in_a').val()));
  });

  $('#in_a').keyup(function() {
    $('#out').val(Analyze($('#in_a').val()));
  });

  $('#analyze').click();

  $('a').attr('target', '_blank');
});
