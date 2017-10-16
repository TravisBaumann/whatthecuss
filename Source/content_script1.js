function walk(rootNode)
{
    // Find all the text nodes in rootNode
    var walker = document.createTreeWalker(
        rootNode,
        NodeFilter.SHOW_TEXT,
        null,
        false
    ),
    node;

    // Modify each text node's value
    while (node = walker.nextNode()) {
        handleText(node);
    }
}

function handleText(textNode) {
  textNode.nodeValue = replaceText(textNode.nodeValue);
}

function replaceText(v)
{


    // fuck

    v = v.replace(/\bfuck\b/g, "cuss");
    v = v.replace(/\bFuck\b/g, "Cuss");
    v = v.replace(/\bFUCK\b/g, "CUSS");
    v = v.replace(/\bfuck(ing|er|ers|s|able|in|ton|tons|load)\b/g, "cuss$1");    
    v = v.replace(/\bFuck(ing|er|ers|s|able|in|ton|tons|load)\b/g, "Cuss$1");
    v = v.replace(/\bFUCK(ING|ER|ERS|S|ABLE|IN|TON|TONS|LOAD)\b/g, "CUSS$1");


        // Shit
    v = v.replace(/\bshit\b/g, "cuss");
    v = v.replace(/\bShit\b/g, "Cuss");
    v = v.replace(/\bSHIT\b/g, "CUSS");
    v = v.replace(/\bshit(ting|ter|ters|s|ty|ton|tons|load)\b/g, "cuss$1");
    v = v.replace(/\bShit(ting|ter|ters|s|ty|ton|tons|load)\b/g, "Cuss$1");
    v = v.replace(/\bSHIT(TING|TER|TERS|S|TY|TON|TONS|LOAD)\b/g, "CUSS$1");
    v = v.replace(/\bbullshit,\b/g "bullcuss$1"); 
    v = v.replace(/\bbBULLSHIT,\b/g "BULLCUSS$1");    
    v = v.replace(/\bbullshit(|ting|ter|ters|s|ty|ton|tons|load)\b/g, "bullcuss");
    v = v.replace(/\bBULLSHIT(TING|TER|TERS|S|TY|TON|TONS|LOAD)\b/g, "BULLCUSS$1");




    // Damn or Dammit

    v = v.replace(/\bdamn\b/g, "cuss");
    v = v.replace(/\bDamn\b/g, "Cuss" );
    v = v.replace(/\bDAMN\b/g, "CUSS");
    v = v.replace(/\bdamnit\b/g, "cussit");
    v = v.replace(/\bDamnit\b/g, "Cussit");
    v = v.replace(/\bDAMNIT\b/g, "CUSSIT");
    v = v.replace(/\bdammit\b/g, "cussit");
    v = v.replace(/\bDammit\b/g, "Cussit");
    v = v.replace(/\bDAMMIT\b/g, "CUSSIT");

    // Ass

    v = v.replace(/\bass\b/g, "cuss");
    v = v.replace(/\bASS\b/g, "CUSS");
    v = v.replace(/\bAss\b/g, "Cuss");
    v = v.replace(/\bass(es|load|hole)\b/g, "cuss$1");


    return v;
}

// The callback used for the document body and title observers
function observerCallback(mutations) {
    var i;

    mutations.forEach(function(mutation) {
        for (i = 0; i < mutation.addedNodes.length; i++) {
            if (mutation.addedNodes[i].nodeType === 3) {
                // Replace the text for text nodes
                handleText(mutation.addedNodes[i]);
            } else {
                // Otherwise, find text nodes within the given node and replace text
                walk(mutation.addedNodes[i]);
            }
        }
    });
}

// Walk the doc (document) body, replace the title, and observe the body and title
function walkAndObserve(doc) {
    var docTitle = doc.getElementsByTagName('title')[0],
    observerConfig = {
        characterData: true,
        childList: true,
        subtree: true
    },
    bodyObserver, titleObserver;

    // Do the initial text replacements in the document body and title
    walk(doc.body);
    doc.title = replaceText(doc.title);

    // Observe the body so that we replace text in any added/modified nodes
    bodyObserver = new MutationObserver(observerCallback);
    bodyObserver.observe(doc.body, observerConfig);

    // Observe the title so we can handle any modifications there
    if (docTitle) {
        titleObserver = new MutationObserver(observerCallback);
        titleObserver.observe(docTitle, observerConfig);
    }
}
walkAndObserve(document);
