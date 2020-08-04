
module.exports = function (RED) {

    RED.nodes.registerType("pdfmake", pdfmake);
    function pdfmake(config) {
        var node = this;
        var pdfMake = require('pdfmake/build/pdfmake.js');
        var pdfFonts = require('pdfmake/build/vfs_fonts.js');
        pdfMake.vfs = pdfFonts.pdfMake.vfs;

        // Create our node and event handler
        RED.nodes.createNode(this, config);

        this.on("input", function (msg) {

            let docDefinition = RED.util.getMessageProperty(msg, config.inputProperty);
            let options = RED.util.getMessageProperty(msg, config.options);
            let outputProperty = config.outputProperty;
            let outputType = config.outputType;
            
            const pdfDocGenerator = pdfMake.createPdf(docDefinition, options);
            if (outputType == "base64") {
                pdfDocGenerator.getBase64((base64) => {
                    RED.util.setMessageProperty(msg, outputProperty, base64);
                    this.send(msg);
                });
            } else if (outputType == "Buffer") {
                pdfDocGenerator.getBuffer((buffer) => {
                    RED.util.setMessageProperty(msg, outputProperty, Buffer.from(buffer));
                    this.send(msg);
                });
            } else {
                throw "unknown output type. This should never happen"
            }

        });

    }
}  