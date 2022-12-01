# Move specific assets from the icons folder tree and move them into 2 new folders in the parent of the selectec folder (3 of 3).

Repo

https://github.com/Artchibald/copy-img-assets-new-loc-adobe-illustrator

Close all documents in Illustrator before using.

It prompts the user to select a folder where all the previous icon exports are saved, then the script loops through all the asset files contained with the root and the subfolders also. Looking for specific names in png and svg, for each iteration:

- Creates 2 new folders above the selected folder (sitecore and marketo).

- Opens the found svg or png file that matches the name regex request.

- It exports the artboard asset as SVG or a PNG into the parent Marketo or sitecore folders.

- Lastly it closes each .ai file before opening the next using the loop.

Happy vector coding!

Any issues archie ATSymbol archibaldbutler.com.


-  There are 2 scripts to use before using this third script. Close all documents in Illustrator before using.
- This script finds specific assets in the icon tree and exports them to two new folders in the parent of the folder you selected during the prompt.
- This script only works locally not on a server. 
- Don't forget to change .txt to .js on the script. 
- FULL README: https://github.com/Artchibald/copy-img-assets-new-loc-adobe-illustrator   
-   This script relates to this first script: https://github.com/Artchibald/2022_icon_rebrand_scripts. Then you should use the second script: https://github.com/Artchibald/batch-800-500-illustrator-export. Lastly use this script: https://github.com/Artchibald/copy-img-assets-new-loc-adobe-illustrator. It is an addon built on top of 2 others to run a batch export of pngs and svgs to Sitecore and Marketo folders. 
- Open Illustrator but don't open a document. 
- Go to file > Scripts > Other Scripts > Import our new script. Don't have an open doc. 
-  Illustrator says(not responding) on PC but it will respond, give Bill Gates some time XD!). 
- If you run the script again, you should probably delete the previous assets created.They get intermixed and overwritten. 
- Both artboard sizes of 1 and 2 must be exactly 256px x 256px. 
- Please try to use underscore instead of spaces to avoid bugs in filenames. 
- If it does not save exports as intended, check the file permissions of where the.ai file is saved(right click folder > Properties > Visibility > Read and write access ? Also you can try apply permissions to sub folders too if you find that option) 
