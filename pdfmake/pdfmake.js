
module.exports = function (RED) {

    RED.nodes.registerType("pdfmake", pdfmake);
    function pdfmake(config) {
        var node = this;
        node.outputType = config.outputType;

        // Create our node and event handler
        RED.nodes.createNode(this, config);

        this.on("input", function (msg) {

            let docDefinition = msg.payload;
            let options = msg.options;
            
            var pdfMake = require('pdfmake/build/pdfmake.js');
            var pdfFonts = require('pdfmake/build/vfs_fonts.js');
            pdfMake.vfs = pdfFonts.pdfMake.vfs;
            const pdfDocGenerator = pdfMake.createPdf(docDefinition, options);
            if (node.outputType == "base64") {
                pdfDocGenerator.getBase64((base64) => {
                    msg.payload = base64;
                    this.send(msg);
                });
            } else if (node.outputType == "Buffer") {
                pdfDocGenerator.getBuffer((buffer) => {
                    msg.payload = new Buffer(buffer);
                    this.send(msg);
                });
            } else {
                throw "unknown output type. This should never happen"
            }

        });

    }
}  