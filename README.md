# node-red-contrib-pdfmake
This node is a simple wrapper around pdfmake, a JSON based solution to create PDFs from a given document definition.

[pdfmake website](http://pdfmake.org/#/)

## Install
node-red-contrib-pdfmake can be install using the node-red editor's pallete or by running npm in the console:

``` bash
npm install node-red-contrib-pdfmake
```

## Usage
There is just one node, and it expects an object in ```msg.payload``` with a valid docDefinition like:
``` json
{ 
	"content": [
		"First paragraph",
		"Another paragraph, this time a little bit longer to make sure, this line will be divided into at least two lines"
	]
	
}
```

The node returns a ```msg.payload``` holding the created PDF either as a Buffer or a base64 encoded string (as configured in the node).

## Examples
Examples are provided using the default node-red way, i.e. use ```import``` in the editor menu and look for examples in the ```node-red-contrib-pdfmake``` package

### #1 simple text PDF
This is the first example found on the pdfmake website.

### #2 image & svg example PDF
This is a custom example showing how to read an image from file and integrate it into the PDF. It also shows a simple SVG to be included as well.
