<h1>Index</h1>
<table id ="home_table">
<tr id="home_tr">
<td class="home_td" id="home_td1">
    <ul>
    </ul>
<td class="home_td"id="home_td2">
<ul>
    </ul>

  <script src="https://code.jquery.com/jquery-3.6.0.js"></script>
  <script src="https://code.jquery.com/ui/1.13.2/jquery-ui.js"></script>
  <script>
  $( function() {
    var availableTags = [
      "ActionScript",
      "AppleScript",
      "Asp",
      "BASIC",
      "C",
      "C++",
      "Clojure",
      "COBOL",
      "ColdFusion",
      "Erlang",
      "Fortran",
      "Groovy",
      "Haskell",
      "Java",
      "JavaScript",
      "Lisp",
      "Perl",
      "PHP",
      "Python",
      "Ruby",
      "Scala",
      "Scheme"
    ];
    $( "#tags" ).autocomplete({
      source: availableTags
    });
  } );
  </script>
</head>
<body>
 
<div class="ui-widget">
  <label for="tags">Tags: </label>
  <input id="tags">
</div>
<td class="home_td"id="home_td3">
<ul>
    </ul>
<td class="home_td"id="home_td4">
<ul>
    </ul>

</td>
</tr>
</table>