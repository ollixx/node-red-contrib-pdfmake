module.exports = function (RED) {

    const sendResponse = (node, msg, response, outputType, outputProp) => {
        if(outputType === 'msg'){
            
            RED.util.setMessageProperty(msg, outputProp, response);

        } else if (outputType === 'flow'){
            
            node.context().flow.set(outputProp, response)

        } else if (outputType === 'global'){
            
            node.context().global.set(outputProp, response)
            
        }

        node.send(msg);
    }

    const evalObj = (object) => {
        return (typeof object !== 'object' || Object.keys(object).length === 0) ? undefined : object
    }

    RED.nodes.registerType("pdfmake", pdfmake);
    function pdfmake(config) {
        var node = this;
        var pdfMake = require('pdfmake/build/pdfmake.js');
        var pdfFonts = require('pdfmake/build/vfs_fonts.js');
        pdfMake.vfs = pdfFonts.pdfMake.vfs;

        // Create our node and event handler
        RED.nodes.createNode(this, config);

        this.on("input", function (msg) {

            let docDefinition = evalObj(RED.util.evaluateNodeProperty(config.inputProperty, config.inputPropertyType, node, msg));
            let tableOptions = evalObj(RED.util.evaluateNodeProperty(config.tableOptions, config.tableOptionsType, node, msg));
            let customFonts = evalObj(RED.util.evaluateNodeProperty(config.fonts, config.fontsType, node, msg));
            let customVFS = evalObj(RED.util.evaluateNodeProperty(config.vfs, config.vfsType, node, msg));
            let outputProperty = config.outputProperty;
            let outputPropertyType = config.outputPropertyType;
            let outputType = config.outputType;
            
            const pdfDocGenerator = pdfMake.createPdf(docDefinition, tableOptions, customFonts, customVFS);

            pdfDocGenerator.getBase64((response) => {
                if (outputType == "buffer") {
                    response = Buffer.from(response, "base64")
                }
                
                sendResponse(node, msg, response, outputPropertyType, outputProperty)

            });
        });

    }
}  