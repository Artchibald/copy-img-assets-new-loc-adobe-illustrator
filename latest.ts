alert(" \n\nThis script only works locally not on a server. \n\nDon't forget to change .txt to .js on the script. \n\nFULL README: https://github.com/Artchibald/batch-800-500-illustrator-export   \n\n  This script relates to this other script: https://github.com/Artchibald/2022_icon_rebrand_scripts. It is an addon built on top to run a batch export of the 800x500 no text. \n\nVideo set up tutorial available here: https://youtu.be/XXXXXXXXXXXXXX. \n\nOpen Illustrator but don't open a document. \n\nGo to file > Scripts > Other Scripts > Import our new script. \n\n Illustrator says(not responding) on PC but it will respond, give Bill Gates some time XD!). \n\nIf you run the script again, you should probably delete the previous assets created.They get intermixed and overwritten. \n\nBoth artboard sizes of 1 and 2 must be exactly 256px x 256px. \n\nGuides must be on a layer called exactly 'Guidelines'. \n\nIcons must be on a layer called exactly 'Art'. \n\nMake sure all layers are unlocked to avoid bugs. \n\nExported assets will be saved where the.ai file is saved. \n\nPlease try to use underscore instead of spaces to avoid bugs in filenames. \n\nMake sure you are using the correct swatches / colours. \n\nIllustrator check advanced colour mode is correct: Edit > Assign profile > Must match sRGB IEC61966 - 2.1. \n\nSelect each individual color shape and under Window > Colours make sure each shape colour is set to rgb in tiny top right burger menu if bugs encountered. \n\nIf it does not save exports as intended, check the file permissions of where the.ai file is saved(right click folder > Properties > Visibility > Read and write access ? Also you can try apply permissions to sub folders too if you find that option) \n\nAny issues: archie ATsymbol archibaldbutler.com.");

let i;
// reusable functions we need
let CSTasks = (function () {
  var tasks: any = {};

  tasks.newRect = function (x, y, width, height) {
    let rect = [];
    rect[0] = x;
    rect[1] = -y;
    rect[2] = width + x;
    rect[3] = -(height + y);
    return rect;
  };

  tasks.selectContentsOnArtboard = function (sourceDoc, i) {
    sourceDoc.selection = null;
    sourceDoc.artboards.setActiveArtboardIndex(i);
    sourceDoc.selectObjectsOnActiveArtboard();
    return sourceDoc.selection;
  };

  //takes a document and a collection of objects (e.g. selection)
  //returns a group made from that collection
  tasks.createGroup = function (sourceDoc, collection) {
    let newGroup = sourceDoc.groupItems.add();
    for (i = 0; i < collection.length; i++) {
      collection[i].moveToBeginning(newGroup);
    }
    return newGroup;
  };

  tasks.getArtboardCorner = function (artboard) {
    let corner = [artboard.artboardRect[0], artboard.artboardRect[1]];
    return corner;
  };

  //takes an array [x,y] for an item's position and an array [x,y] for the position of a reference point
  //returns an array [x,y] for the offset between the two points
  tasks.getOffset = function (itemPos, referencePos) {
    let offset = [itemPos[0] - referencePos[0], itemPos[1] - referencePos[1]];
    return offset;
  };

  //takes an object (e.g. group) and a destination array [x,y]
  //moves the group to the specified destination
  tasks.translateObjectTo = function (object, destination) {
    let offset = tasks.getOffset(object.position, destination);
    object.translate(-offset[0], -offset[1]);
  };

  //take a source document, artboard index, and a colorspace (e.g. DocumentColorSpace.RGB)
  //opens and returns a new document with the source document's units and specified artboard, the specified colorspace
  tasks.duplicateArtboardInNewDoc = function (
    sourceDoc,
    artboardIndex,
    colorspace
  ) {
    let rectToCopy = sourceDoc.artboards[artboardIndex].artboardRect;
    let newDoc = tasks.newDocument(sourceDoc, colorspace);
    newDoc.artboards.add(rectToCopy);
    newDoc.artboards.remove(0);
    return newDoc;
  };

  //takes a group
  //ungroups that group at the top layer (no recursion for nested groups)
  tasks.ungroupOnce = function (group) {
    for (i = group.pageItems.length - 1; i >= 0; i--) {
      group.pageItems[i].move(
        group.pageItems[i].layer,
        /*@ts-ignore*/
        ElementPlacement.PLACEATEND
      );
    }
  };


  /****************************
    CREATING AND SAVING DOCUMENTS
    *****************************/

  //take a source document and a colorspace (e.g. DocumentColorSpace.RGB)
  //opens and returns a new document with the source document's units and the specified colorspace
  tasks.newDocument = function (sourceDoc, colorSpace) {
    let preset = new DocumentPreset();
    /*@ts-ignore*/
    preset.colorMode = colorSpace;
    /*@ts-ignore*/
    preset.units = sourceDoc.rulerUnits;
    /*@ts-ignore*/
    let newDoc = app.documents.addDocument(colorSpace, preset);
    newDoc.pageOrigin = sourceDoc.pageOrigin;
    newDoc.rulerOrigin = sourceDoc.rulerOrigin;
    return newDoc;
  };

  //takes a document, destination file, starting width and desired width
  //scales the document proportionally to the desired width and exports as a PNG
  tasks.scaleAndExportPNG = function (doc, destFile, startWidth, desiredWidth) {
    let scaling = (100.0 * desiredWidth) / startWidth;
    let options = new ExportOptionsPNG24();
    /*@ts-ignore*/
    options.antiAliasing = true;
    /*@ts-ignore*/
    options.transparency = true;
    /*@ts-ignore*/
    options.artBoardClipping = true;
    /*@ts-ignore*/
    options.horizontalScale = scaling;
    /*@ts-ignore*/
    options.verticalScale = scaling;
    doc.exportFile(destFile, ExportType.PNG24, options);
  };

  //takes a document, destination file, starting width and desired width
  //scales the document proportionally to the desired width and exports as a SVG
  tasks.scaleAndExportSVG = function (doc, destFile, startWidth, desiredWidth) {
    let scaling = (100.0 * desiredWidth) / startWidth;
    let options = new ExportOptionsSVG();
    /*@ts-ignore*/
    options.horizontalScale = scaling;
    /*@ts-ignore*/
    options.verticalScale = scaling;
    // /*@ts-ignore*/
    // options.transparency = true;
    /*@ts-ignore*/
    // options.compressed = false; 
    // /*@ts-ignore*/
    // options.saveMultipleArtboards = true;
    // /*@ts-ignore*/
    // options.artboardRange = ""
    // options.cssProperties.STYLEATTRIBUTES = false;
    // /*@ts-ignore*/
    // options.cssProperties.PRESENTATIONATTRIBUTES = false;
    // /*@ts-ignore*/
    // options.cssProperties.STYLEELEMENTS = false;
    // /*@ts-ignore*/
    // options.artBoardClipping = true;
    doc.exportFile(destFile, ExportType.SVG, options);
  };

  return tasks;

})();
// end reusable functions

// refs
// https://gist.github.com/joonaspaakko/df2f9e31bdb365a6e5df
// Finds all .ai files from the input folder + its subfolders 
var overwrite = true // boolean
if (app.documents.length > 0) {
  alert("ERROR: \n Close all documents before running this script.");
}
// Run the script
else {
  var files,
    folder = Folder.selectDialog("Please select the folder where the icons are saved");
  // If folder variable return null, user most likely canceled the dialog or
  // the input folder and it subfolders don't contain any .ai files.
  if (folder != null) {
    // returns an array of file paths in the selected folder.
    files = GetFiles(folder);
    alert(files);
    // This is where things actually start happening...
    process(files);
  }
}

function process(files) {
  // Loop through the list of .ai files:
  // Open > Save > Close > LOOP
  var i;
  for (i = 0; i < files.length; i++) {
    // Current file
    var file = files[i]

    // Open
    app.open(file);
    // If overwrite is false, create a new file, otherwise use "file" variable;
    //  file = !overwrite ? new File(file.toString().replace(".ai", " (legacyFile).ai")) : file;

    // custom actions starts here
    var sourceDoc = app.activeDocument;
    alert(sourceDoc.name);

    //return; You can use a return to stop the code and see the effects throughout.
    // happy vector coding!
    // ends here

    // Save
    //app.activeDocument.saveAs(file, SaveOptions_ai())
    // Close
    app.activeDocument.close(SaveOptions.DONOTSAVECHANGES);
  }
  // For better or for worse...
  alert("Script is done.");

}

function SaveOptions_ai() {
  var saveOptions = new IllustratorSaveOptions();
  // saveOptions.compatibility = Compatibility["ILLUSTRATOR" + targetVersion];
  /*@ts-ignore*/
  saveOptions.flattenOutput = OutputFlattening.PRESERVEAPPEARANCE;
  /*@ts-ignore*/
  saveOptions.compressed = false; // Version 10 or later
  /*@ts-ignore*/
  saveOptions.pdfCompatible = true; // Version 10 or later
  /*@ts-ignore*/
  saveOptions.embedICCProfile = true; // Version 9 or later
  /*@ts-ignore*/
  saveOptions.embedLinkedFiles = true; // Version 7 or later
  return saveOptions
}

function GetFiles(folder) {
  var i, item,
    // Array to store the files in...
    files = [],
    // Get files...
    items = folder.getFiles();
  // Loop through all files in the given folder
  for (i = 0; i < items.length; i++) {
    item = items[i];
    // Find .ai files
    var fileformat = item.name.match(/\.png$/i),
      legacyFile = item.name.indexOf("(legacyFile)") > 0;
    // If item is a folder, check the folder for files.
    if (item instanceof Folder) {
      // Combine existing array with files found in the folder
      files = files.concat(GetFiles(item));
    }
    // If the item is a file, push it to the array.
    else if (item instanceof File && fileformat && !legacyFile) {
      // Push files to the array
      files.push(item);
    }
  }
  return files;
}