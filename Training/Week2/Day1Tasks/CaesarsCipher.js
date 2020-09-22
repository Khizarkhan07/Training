function rot13(str) {
    var splitedString = str.split(" "); //spliting the sentence in string array
    var cipher= "";
    for (var i =0 ; i < splitedString.length; i++){
      cipher += encodeString(splitedString[i]); //concat strings with a space between
      cipher += " ";
    }
    const editedCipher = cipher.slice(0, -1); //removing last extra space
    console.log(editedCipher);
    return editedCipher;
  }
  
  function encodeString (str){
    var encodedString = "";
    var singleChar = "";
  
    for (var i=0; i< str.length; i++){
      if(str.charCodeAt(i)>64 && str.charCodeAt(i)<91){ // check if char is bewteen A to Z
        
        //converting char  
        if(str.charCodeAt(i)-13 < 65){
        singleChar = str.charCodeAt(i)+13;
        }
        else{
          singleChar = str.charCodeAt(i)-13;
        }     
          encodedString += String.fromCharCode(singleChar); //making string from chars
      }
      else{
        encodedString += str.charAt(i); //pasing on if char is not btw A to Z
      }    
    }
    
    return encodedString;
  }
  rot13("GUR DHVPX OEBJA SBK WHZCF BIRE GUR YNML QBT.");
  