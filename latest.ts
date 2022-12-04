alert("\n\n There are 2 scripts to use before using this third script. Close all documents in Illustrator before using.\n\nThis script finds specific assets in the icon tree and exports them to two new folders in the parent of the folder you selected during the prompt.\n\nThis script only works locally not on a server. \n\nDon't forget to change .txt to .js on the script. \n\nFULL README: https://github.com/Artchibald/copy-img-assets-new-loc-adobe-illustrator   \n\n  This script relates to this first script: https://github.com/Artchibald/2022_icon_rebrand_scripts. Then you should use the second script: https://github.com/Artchibald/batch-800-500-illustrator-export. Lastly use this script: https://github.com/Artchibald/copy-img-assets-new-loc-adobe-illustrator. It is an addon built on top of 2 others to run a batch export of pngs and svgs to Sitecore and Marketo folders. \n\nOpen Illustrator but don't open a document. \n\nGo to file > Scripts > Other Scripts > Import our new script. Don't have an open doc. \n\n Illustrator says(not responding) on PC but it will respond, give Bill Gates some time XD!). \n\nIf you run the script again, you should probably delete the previous assets created.They get intermixed and overwritten. \n\nBoth artboard sizes of 1 and 2 must be exactly 256px x 256px. \n\nPlease try to use underscore instead of spaces to avoid bugs in filenames. \n\nIf it does not save exports as intended, check the file permissions of where the.ai file is saved(right click folder > Properties > Visibility > Read and write access ? Also you can try apply permissions to sub folders too if you find that option) \n\nAny issues: archie ATsymbol archibaldbutler.com.");

let files;
let folder = Folder.selectDialog("Please select the folder where the images you need are saved");
let i;
let folderOneName = "Sitecore-product-icon-assets";
let folderTwoName = "Marketo-product-icon-assets";
let CSTasks = (function () {
  var tasks: any = {};
  tasks.scaleAndExportPNG = function (sourceDoc, destFile) {
    let options = new ExportOptionsPNG24();
    /*@ts-ignore*/
    options.antiAliasing = true;
    /*@ts-ignore*/
    options.transparency = true;
    /*@ts-ignore*/
    options.artBoardClipping = false;
    sourceDoc.exportFile(destFile, ExportType.PNG24, options);
  };
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

try {
  new Folder(`${folder.path}/${folderOneName}`).create();
  new Folder(`${folder.path}/${folderTwoName}`).create();
} catch (e) {
  alert(
    "Issues with creating setup folders. Check your file permission properties or file structure.",
    e.message
  );
}

function move1610x2Png() {

  if (app.documents.length > 0) {
    alert("ERROR: \n Close all documents before running this script.");
  }
  else {
    if (folder != null) {
      files = GetFiles(folder);
      process(files);
    }
  }

  function process(files) {
    var i;
    for (i = 0; i < files.length; i++) {
      var file = files[i];
      app.open(file);
      var sourceDoc = app.activeDocument;
      let filename = `/${sourceDoc.name}`;
      let destFile = new File(Folder(`${sourceDoc.path}/../../../../../Sitecore-product-icon-assets`) + filename);
      CSTasks.scaleAndExportPNG(sourceDoc, destFile, 1000, 1600);
      // Save
      //app.activeDocument.saveAs(file, SaveOptions_ai())
      // Close
      app.activeDocument.close(SaveOptions.DONOTSAVECHANGES);
    }
    // alert("Script is done.");
  }

  function GetFiles(folder) {
    var i, item,
      files = [],
      items = folder.getFiles();
    for (i = 0; i < items.length; i++) {
      item = items[i];
      var fileformat = item.name.match(/\_1610_2x.png$/i),
        legacyFile = item.name.indexOf("(legacyFile)") > 0;
      if (item instanceof Folder) {
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
}
move1610x2Png();

function moveExpressiveCroppedPng() {

  if (app.documents.length > 0) {
    alert("ERROR: \n Close all documents before running this script.");
  }
  else {
    if (folder != null) {
      files = GetFiles(folder);
      process(files);
    }
  }

  function process(files) {
    var i;
    for (i = 0; i < files.length; i++) {
      var file = files[i];
      app.open(file);
      var sourceDoc = app.activeDocument;
      let filename = `/${sourceDoc.name}`;
      let destFile = new File(Folder(`${sourceDoc.path}/../../../../../Sitecore-product-icon-assets`) + filename);
      CSTasks.scaleAndExportPNG(sourceDoc, destFile, 1024, 1024);
      // Save
      //app.activeDocument.saveAs(file, SaveOptions_ai())
      // Close
      app.activeDocument.close(SaveOptions.DONOTSAVECHANGES);
    }
    // alert("Script is done.");
  }

  function GetFiles(folder) {
    var i, item,
      files = [],
      items = folder.getFiles();
    for (i = 0; i < items.length; i++) {
      item = items[i];
      var fileformat = item.name.match(/\_Expressive_Cropped.png$/i),
        legacyFile = item.name.indexOf("(legacyFile)") > 0;
      if (item instanceof Folder) {
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
}
moveExpressiveCroppedPng();

function moveCoreCroppedPng() {

  if (app.documents.length > 0) {
    alert("ERROR: \n Close all documents before running this script.");
  }
  else {
    if (folder != null) {
      files = GetFiles(folder);
      process(files);
    }
  }

  function process(files) {
    var i;
    for (i = 0; i < files.length; i++) {
      var file = files[i];
      app.open(file);
      var sourceDoc = app.activeDocument;
      let filename = `/${sourceDoc.name}`;
      // Save in Sitecore
      let destFileSiteCore = new File(Folder(`${sourceDoc.path}/../../../../../Sitecore-product-icon-assets`) + filename);
      CSTasks.scaleAndExportPNG(sourceDoc, destFileSiteCore, 1024, 1024);
      // Save in Marketo
      let destFileMarketo = new File(Folder(`${sourceDoc.path}/../../../../../Marketo-product-icon-assets`) + filename);
      CSTasks.scaleAndExportPNG(sourceDoc, destFileMarketo, 1024, 1024);
      // Save
      //app.activeDocument.saveAs(file, SaveOptions_ai())
      // Close
      app.activeDocument.close(SaveOptions.DONOTSAVECHANGES);
    }
    // alert("Script is done.");
  }

  function GetFiles(folder) {
    var i, item,
      files = [],
      items = folder.getFiles();
    for (i = 0; i < items.length; i++) {
      item = items[i];
      var fileformat = item.name.match(/\_Core_Cropped.png$/i),
        legacyFile = item.name.indexOf("(legacyFile)") > 0;
      if (item instanceof Folder) {
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
}
moveCoreCroppedPng();

function move800x400Png() {

  if (app.documents.length > 0) {
    alert("ERROR: \n Close all documents before running this script.");
  }
  else {
    if (folder != null) {
      files = GetFiles(folder);
      process(files);
    }
  }

  function process(files) {
    var i;
    for (i = 0; i < files.length; i++) {
      var file = files[i];
      app.open(file);
      var sourceDoc = app.activeDocument;
      let filename = `/${sourceDoc.name}`;
      // Save in Marketo
      let destFileMarketo = new File(Folder(`${sourceDoc.path}/../../../../../Marketo-product-icon-assets`) + filename);
      CSTasks.scaleAndExportPNG(sourceDoc, destFileMarketo, 400, 800);
      // Save
      //app.activeDocument.saveAs(file, SaveOptions_ai())
      // Close
      app.activeDocument.close(SaveOptions.DONOTSAVECHANGES);
    }
    // alert("Script is done.");
  }

  function GetFiles(folder) {
    var i, item,
      files = [],
      items = folder.getFiles();
    for (i = 0; i < items.length; i++) {
      item = items[i];
      var fileformat = item.name.match(/\_800x400.png$/i),
        legacyFile = item.name.indexOf("(legacyFile)") > 0;
      if (item instanceof Folder) {
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
}
move800x400Png();

//1024x512
function move1024x512Png() {

  if (app.documents.length > 0) {
    alert("ERROR: \n Close all documents before running this script.");
  }
  else {
    if (folder != null) {
      files = GetFiles(folder);
      process(files);
    }
  }

  function process(files) {
    var i;
    for (i = 0; i < files.length; i++) {
      var file = files[i];
      app.open(file);
      var sourceDoc = app.activeDocument;
      let filename = `/${sourceDoc.name}`;
      // Save in Marketo
      let destFileMarketo = new File(Folder(`${sourceDoc.path}/../../../../../Sitecore-product-icon-assets`) + filename);
      CSTasks.scaleAndExportPNG(sourceDoc, destFileMarketo, 512, 1024);
      // Save
      //app.activeDocument.saveAs(file, SaveOptions_ai())
      // Close
      app.activeDocument.close(SaveOptions.DONOTSAVECHANGES);
    }
    // alert("Script is done.");
  }

  function GetFiles(folder) {
    var i, item,
      files = [],
      items = folder.getFiles();
    for (i = 0; i < items.length; i++) {
      item = items[i];
      var fileformat = item.name.match(/\_1024x512.png$/i),
        legacyFile = item.name.indexOf("(legacyFile)") > 0;
      if (item instanceof Folder) {
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
}
move1024x512Png();

function moveExpressiveCroppedSvg() {

  if (app.documents.length > 0) {
    alert("ERROR: \n Close all documents before running this script.");
  }
  else {
    if (folder != null) {
      files = GetFiles(folder);
      process(files);
    }
  }

  function process(files) {
    var i;
    for (i = 0; i < files.length; i++) {
      var file = files[i];
      app.open(file);
      var sourceDoc = app.activeDocument;
      let filename = `/${sourceDoc.name}`;
      // Save in Marketo
      let destFileSiteCore = new File(Folder(`${sourceDoc.path}/../../../../../Sitecore-product-icon-assets`) + filename);
      CSTasks.scaleAndExportSVG(sourceDoc, destFileSiteCore, 1024, 1024);
      // Save
      //app.activeDocument.saveAs(file, SaveOptions_ai())
      // Close
      app.activeDocument.close(SaveOptions.DONOTSAVECHANGES);
    }
    // alert("Script is done.");
  }

  function GetFiles(folder) {
    var i, item,
      files = [],
      items = folder.getFiles();
    for (i = 0; i < items.length; i++) {
      item = items[i];
      var fileformat = item.name.match(/\_Expressive_Cropped.svg$/i),
        legacyFile = item.name.indexOf("(legacyFile)") > 0;
      if (item instanceof Folder) {
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
}
moveExpressiveCroppedSvg();

function moveCoreCroppedSvg() {

  if (app.documents.length > 0) {
    alert("ERROR: \n Close all documents before running this script.");
  }
  else {
    if (folder != null) {
      files = GetFiles(folder);
      process(files);
    }
  }

  function process(files) {
    var i;
    for (i = 0; i < files.length; i++) {
      var file = files[i];
      app.open(file);
      var sourceDoc = app.activeDocument;


      let filename = `/${sourceDoc.name}`;
      // Save in Marketo
      let destFileSiteCore = new File(Folder(`${sourceDoc.path}/../../../../../Sitecore-product-icon-assets`) + filename);
      // if asset is in the root folder, the path is different
      //if (sourceDoc.path.indexOf("svg") > 0) {



      decodeURI(sourceDoc.path.name);
      // alert(sourceDoc.path.name.length);
      // alert(sourceDoc.path.name);
      // if parent name contains "svg" then it's not in the root folder
      if (sourceDoc.path.name.length < 4) {
        destFileSiteCore = new File(Folder(`${sourceDoc.path}/../../../../../Sitecore-product-icon-assets`) + filename);
      } else {
        destFileSiteCore = new File(Folder(`${sourceDoc.path}/../../../Sitecore-product-icon-assets`) + filename);
      }

      CSTasks.scaleAndExportSVG(sourceDoc, destFileSiteCore, 1024, 1024);
      // Save
      //app.activeDocument.saveAs(file, SaveOptions_ai())
      // Close
      app.activeDocument.close(SaveOptions.DONOTSAVECHANGES);
    }
    // alert("Script is done.");
  }

  function GetFiles(folder) {
    var i, item,
      files = [],
      items = folder.getFiles();
    for (i = 0; i < items.length; i++) {
      item = items[i];
      var fileformat = item.name.match(/\_Core_Cropped.svg$/i),
        legacyFile = item.name.indexOf("(legacyFile)") > 0;
      if (item instanceof Folder) {
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
}
moveCoreCroppedSvg();


