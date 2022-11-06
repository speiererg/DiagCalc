<?php
session_start();
// If the user is not logged in redirect to the login page...
if (!isset($_SESSION['loggedin'])) {
    header('Location: login/login.html');
    exit;
}
?>
<p>
<h1 style="text-align:center;">Mapping managment</h1>
<h2>Search SNOMED_Codes</h2> 
Search: <input type="text" id="input_concept_SNOMED_search" label="Search:">
<p>
<button class="button_download" id ="button_concept_SNOMED_search">Search</button>
<ul id="mapping_ul_SNOMED">
</ul>
Remplace with: <input type="text" id="input_concept_SNOMED_remplace" label="Remplace with:" style="display:none">

<button class="button_download" id ="button_concept_SNOMED_remplace" style="display:none">Remplace All</button>

<p>
<h2>Search ICD_Codes</h2>
<input type="text" id="input_concept_ICD_search">
<p>
<button class="button_download" id ="button_concept_ICD_search">Search</button>
<p>
<h2>Search Diagnosis</h2>
<input type="text" id="input_concept_diagnosis_search">
<p>
<button class="button_download" id ="button_concept_diagnosis_search">Search</button>
<ul id="mapping_ul_diagnosis">
</ul>