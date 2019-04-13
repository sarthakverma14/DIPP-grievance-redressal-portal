<?php
    $data = $_POST;
    $contact = $data['contact'];
    $name = $data['name'];
    $gnr=$data['gnr'];

    // Account details
    $apiKey = urlencode('DzqUrvDM1Q8-yBJghj5UG9b1jSbTnQE2SkhjWDyGRH');
    
    // Message details
    $numbers = array($data['contact']);
    $sender = urlencode('TXTLCL');
    $message = rawurlencode('Hi '.$name.'. Your Grievance with (GNR '.$gnr.') has been approved by DIPP and send to yhe ministry.For more detail go to our website and wait for further response from the ministry');
 
    $numbers = implode(',', $numbers);
 
    // Prepare data for POST request
    $data = array('apikey' => $apiKey, 'numbers' => $numbers, "sender" => $sender, "message" => $message);
 
    // Send the POST request with cURL
    $ch = curl_init('https://api.textlocal.in/send/');
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    $response = curl_exec($ch);
    curl_close($ch);
    
    // Process your response here
    // echo $response;

if($response){
  $json = array(
            'status' => true,
            'k'=>$response
        );
    $jsonstring = json_encode($json);
    echo $jsonstring;
}
else{
  $json = array(
            'status' => false
        );
    $jsonstring = json_encode($json);
    echo $jsonstring;
}
?>