var keyList = new Map();
var publockList = new Map();
var idcounter = 0;

var keyListDiv = document.getElementById("pu-key-list");
var keyPublicDiv = document.getElementById("pu-keys-public");
var keyPrivateDiv = document.getElementById("pu-keys-private");

var keyDiv = document.getElementById("pu-content-keys");
var publockDiv = document.getElementById("pu-content-publock");

var publockListDiv = document.getElementById("pu-publock-list");

var publockIdDiv = document.getElementById("publock-id");
var publockConnectionsDiv = document.getElementById("publock-connections");
var publockMessageSizeDiv = document.getElementById("publock-messages-size");
var publockDeleteDiv = document.getElementById("publock-delete");

var publockKeyPairInputDiv = document.getElementById("publock-keypair-input");

var publockMessageListDiv = document.getElementById("pu-content-publock-messagelist");

var pseudonymInput = document.getElementById("publock-pseudonym-input");
var messageInput = document.getElementById("publock-message-input");
var keypairInput = document.getElementById("publock-keypair-input");

var activePublock;
var activeKeyId;

function createKey()
{
    console.log("creating key");
    var newKey = new NodeRSA({b: 512});
    keyList.set(idcounter++, newKey);
    
    updateKeyList();
}

function deleteKey()
{
    this.keyList.delete(activeKeyId);
    
    if (this.keyList.size == 0) createKey();
    
    updateKeyList();
    loadKeys();
    loadKey(Array.from(keyList.keys())[0]);
}

function createPublock()
{
    var newPublock = new publock_module.Publock();
    
    if (Array.from(publockList).length != 0)
    {
        newPublock.joinPublockNetworkFrom(Array.from(publockList.values())[0]);
        console.log("publock " + newPublock.id + " joined network");
    }
    
    publockList.set(newPublock.id, newPublock);
    
    updatePublockList();
    loadPublock(newPublock.id);
}

function deletePublock(publockId)
{
    var publockToDelete = publockList.get(publockId);
    publockList.delete(publockId);
    publockToDelete.disconnect();
    
    
    updatePublockList();
    if (publockList.size == 0) loadKeys();
    else loadPublock(Array.from(publockList.values())[0].id);
}

function updateKeyList()
{
    var generatedHTML = "";
    
    for (var index of keyList.keys())
    {
        console.log("key added.");
        generatedHTML = generatedHTML + "<li onclick='loadKey(" + index + ")'>key #" + index + "</li>";
    }
    
    generatedHTML = generatedHTML + "<li onclick='createKey()'>+ generate key</li>";
    
    keyListDiv.innerHTML = generatedHTML;
}

function loadKey(keyId)
{
    activeKeyId = keyId;
    keyPublicDiv.value = keyList.get(activeKeyId).exportKey('public');
    keyPrivateDiv.value = keyList.get(activeKeyId).exportKey('private');
}

function loadKeys()
{
    keyDiv.style.zIndex = "1";
    publockDiv.style.zIndex = "0";
}

function loadPublock(publockId)
{
    activePublock = publockList.get(publockId);
    
    publockIdDiv.innerHTML = activePublock.id;
    publockConnectionsDiv.innerHTML = activePublock.connections.size;
    publockMessageSizeDiv.innerHTML = activePublock.messageChain.size;
    
    publockDeleteDiv.innerHTML = "<a onclick='deletePublock(\"" + activePublock.id + "\")'>delete publock</a>";
    
    var keyHTML = "";
    
    for (var keyId of keyList.keys())
    {
        keyHTML = keyHTML + '<option value="' + keyId + '">key #' + keyId + '</option>';
    }
    
    publockKeyPairInputDiv.innerHTML = keyHTML;
    
    pseudonymInput.value = "";
    messageInput.value = "";
    
    loadPublockMessages(publockId);
    
    keyDiv.style.zIndex = "0";
    publockDiv.style.zIndex = "1";
}

function loadPublockMessages(publockId)
{
    var messageChain = publockList.get(publockId).messageChain;
    var generatedHTML = "<h3>MessageChain</h3>";
    
    for (var message of messageChain.messageList)
    {
        generatedHTML = generatedHTML + '<div class="pu-message">';
        generatedHTML = generatedHTML + '<span class="pu-message-field pu-message-hash">' + message.hash + '</span>';
        generatedHTML = generatedHTML + '<span class="pu-message-field pu-message-pseudonym">' + message.pseudonym + '</span>';
        generatedHTML = generatedHTML + '<span class="pu-message-field pu-message-body">' + message.body + '</span>';
        generatedHTML = generatedHTML + '<span class="pu-message-field pu-message-date">' + message.date + '</span>';
        generatedHTML = generatedHTML + '<span class="pu-message-field pu-message-previous-hash">' + message.previousHash + '</span>';
        generatedHTML = generatedHTML + '<span class="pu-message-field pu-message-public-key">' + message.publicKey + '</span>';
        generatedHTML = generatedHTML + '<span class="pu-message-field pu-message-encrypted-hash">' + message.encryptedHash + '</span>';
        generatedHTML = generatedHTML + '</div>';
    }
    
    publockMessageListDiv.innerHTML = generatedHTML;
}

function addMessage()
{
    var pseudonym = pseudonymInput.value;
    var message = messageInput.value;
    var keypair = keyList.get(parseInt(keypairInput.value));
    
    activePublock.addNewMessage(pseudonym, message, "", keypair);
    loadPublock(activePublock.id);
}

function updatePublockList()
{
    var generatedHTML = "";
    
    for (var publockId of publockList.keys())
    {
        generatedHTML = generatedHTML + "<li onclick='loadPublock(\"" + publockId + "\")'><i class='fa fa-dot-circle-o' aria-hidden='true'></i> publock #" + publockId + "</li>";
    }
    
    generatedHTML = generatedHTML + "<li onclick='createPublock()'><i class='fa fa-plus-circle' aria-hidden='true'></i> Add publock</li>"
    
    publockListDiv.innerHTML = generatedHTML;
}

createKey();
loadKey(0);
updatePublockList();
updateKeyList();
loadKeys();
