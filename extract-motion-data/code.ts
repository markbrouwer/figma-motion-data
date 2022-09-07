// This file holds the main code for the plugin. It has access to the *document*.
// You can access browser APIs such as the network by creating a UI which contains
// a full browser environment (see documentation).

// Runs this code if the plugin is run in Figma
if (figma.editorType === 'figma') {
  // This plugin will open a window to prompt the user to enter a number, and
  // it will then create that many rectangles on the screen.

  // This shows the HTML page in "ui.html".
  figma.showUI(__html__);
  figma.ui.resize(550, 400);

  figma.loadFontAsync({ family: "Inter", style: "Regular" });

  // Calls to "parent.postMessage" from within the HTML page will trigger this
  // callback. The callback will be passed the "pluginMessage" property of the
  // posted message.

  var selection1;
  var selection2;
  var selectionCounter = 0;

  figma.on('selectionchange', () => {
    if(figma.currentPage.selection.length > 0){
      if(selectionCounter == 0){
        selection1 = figma.currentPage.selection[0];
        selectionCounter = selectionCounter + 1; 
      }else{
        selection2 = figma.currentPage.selection[0];
        selectionCounter = 0;
      }
      figma.ui.postMessage([figma.currentPage.selection[0].id, 'selectionData', figma.currentPage.selection[0].name]);
    }
  })

  //CLOSE 
  figma.ui.onmessage = msg => {
    if (msg.type === 'close'){
      console.log('closed')
      figma.closePlugin();
    }

    if(msg.type === 'parseDocument'){
      // gets a js object of the entire document
      const nodes = figma.root;
      //get a js object of the current figma page
      //const nodes = figma.currentPage;
      console.log('nodes: ', nodes)

    }

  //GET MOTION CURVES
    if(msg.type === 'getMotionCurves'){
      let nodes;
      //var jsonFile = {'motionData': []};
      var jsonFile = [];
      if(figma.currentPage.selection.length === 0){
        nodes = figma.currentPage;
        //figma.closePlugin("No Motion curves found in selection")
      }
      if(figma.currentPage.selection.length === 1) {
        nodes = figma.currentPage.selection;
      }
      if(figma.currentPage.selection.length > 1) {
        nodes = figma.currentPage.selection;
      }
      //t(nodes);
      traverseForMotionCurves(nodes, jsonFile);
      console.log('jsonFile : ', jsonFile )
      //console.log('stringed? : ', JSON.stringify(jsonFile))
      figma.ui.postMessage([jsonFile, 'jsonMotionFileExport']);
    }

////////////////////////////////////////////////////////////////////////////////////
    // THIS IS WIP CODE FOR AN ATTEMPT TO APPLY EXTRACTED MOTION DATA TO NEW FRAMES
    if(msg.type === 'applyMotionCurves'){
     console.log('Selected frames : ', selection1, selection2);
      var s1 = figma.getNodeById(selection1.id);
      var s2 = figma.getNodeById(selection2.id);


      //const a = figma.getNodeById(selection1.id).slice()
      if('reactions' in s1 ){
        console.log('s1 ,= ', s1);
        var test = Object.assign({}, s1.reactions[0]);
        var test2 = s1.clone()
        //var test2 = {...s1}
        var test3 = JSON.parse(JSON.stringify(s1));
        console.log('test : ', test);
        console.log('test2 : ', test2);
        console.log('test3 : ', test3);


        const e =  {
          "easing": {
            "type": "CUSTOM_CUBIC_BEZIER",
            "easingFunctionCubicBezier": {
                "x1": 0.90,
                "y1": 5.32,
                "x2": 1.00,
                "y2": 1.00,
              }
          }
        }; 

        const t = {
            "transition": {
              "type": "SLIDE_IN",
              "direction": "BOTTOM",
              "matchLayers": true,
              "easing": {
                  "type": "CUSTOM_CUBIC_BEZIER",
                  "easingFunctionCubicBezier": {
                      "x1": 0.90,
                      "y1": 5.32,
                      "x2": 1.00,
                      "y2": 1.00,
                    }
                },
                "duration": 0.333
            },
          };

          const motion = {
            "reactions": {
                    "action": {
                        "type": "NODE",
                        "destinationId": s2.id,
                        "navigation": "NAVIGATE",
                        "transition": {
                            "type": "SLIDE_IN",
                            "direction": "BOTTOM",
                            "matchLayers": true,
                            "easing": {
                                "type": "CUSTOM_CUBIC_BEZIER",
                                "easingFunctionCubicBezier": {
                                    "x1": 0.90,
                                    "y1": 5.32,
                                    "x2": 1.00,
                                    "y2": 1.00,
                                  }
                              },
                              "duration": 0.333
                          },
                          "preserveScrollPosition": false
                      },
                      "trigger": {
                          "type": "ON_CLICK"
                      },
                 }
                };

        //test = motion;
        //test2.reactions[0] = motion;
        // console.log('test2 after: ', test2)
        //Object.assign(s1, test)
        //s1.reactions[0] = 
        // console.log('selection1 reactions After : ', s1.reactions[0].action['transition'].easing);

        if(s1.reactions.length === 0){
          console.log('selection1 reactions : ', s1.reactions);

          const motion = {
            "reactions": {
                    "action": {
                        "type": "NODE",
                        "destinationId": s2.id,
                        "navigation": "NAVIGATE",
                        "transition": {
                            "type": "SLIDE_IN",
                            "direction": "BOTTOM",
                            "matchLayers": true,
                            "easing": {
                                "type": "CUSTOM_CUBIC_BEZIER",
                                "easingFunctionCubicBezier": {
                                    "x1": 0.90,
                                    "y1": 5.32,
                                    "x2": 1.00,
                                    "y2": 1.00,
                                  }
                              },
                              "duration": 0.333
                          },
                          "preserveScrollPosition": false
                      },
                      "trigger": {
                          "type": "ON_CLICK"
                      },
                 }
                };
        //s1.reactions === motion;
        //s1.reactions.push(motion);
        ///const newS1 = s1;
        //const cloneFood = { ...food };

        console.log('s1 ,= ', s1);
        //let ss1 = Object.assign({}, figma.getNodeById(selection1.id));
        //let ss1 = {...figma.getNodeById(selection1.id)}
        //var ss1 = JSON.parse(JSON.stringify(s1));
        //const ss1 = Object.assign({}, s1)
        //console.log('ss12 : ', ss1)

        //s1.push(motion)
        //Object.assign(ss1, motion)
        const e =  {
          "easing": {
            "type": "CUSTOM_CUBIC_BEZIER",
            "easingFunctionCubicBezier": {
                "x1": 0.90,
                "y1": 5.32,
                "x2": 1.00,
                "y2": 1.00,
              }
          }
        }; 
        //s1.reactions[0].action[0].transition.easing = e;
        console.log('selection1 reactions After : ', s1);
      }
    } 
  }
  ////////////////////////////////////////////////////////////////////////////////////

  
}
// If the plugins isn't run in Figma, run this code
}else{
  // This shows the HTML page in "ui.html".
  figma.showUI(__html__);

  figma.ui.onmessage = msg => {
    if (msg.type === 'close'){
      figma.closePlugin();
    }
  }
};

// Helper functions
// Makes a clone of the nodes
function clone(val) {
  return JSON.parse(JSON.stringify(val))
}

// Function to go through whatever is selected, if anything and sends a message back to the UI with a prompt to download the JSON file containing the motion curve values
function traverseForMotionCurves(nodes, jsonFile){
  const file = {};
  if('children' in nodes){
    //console.log('nodes.children : ' , nodes.children)
    traverseForMotionCurves(nodes.children, jsonFile)
  }else{
   nodes.map(element => {
     if('children' in element){
      traverseForMotionCurves(element.children, jsonFile)
     }
     if('reactions' in element && element.reactions.length !== 0){
       console.log('reations : ', element.reactions)
       if('action' in element.reactions[0]){
         //console.log('has action' , element.reactions[0].action) // here we can see the type of action used for the animation, typically its 'NAVIGATE'
         if(element.reactions[0].action !== null && 'transition' in element.reactions[0].action ){
          //console.log('has transitions', element.reactions[0].action.transition) //here we can get the type of animation 'SMART_ANIMATE' , 'EAST_OUT' ect.
          if(element.reactions[0].action.transition !== null && 'easing' in element.reactions[0].action.transition){
            //console.log('found easing', element.reactions[0].action.transition.easing) // here we can see if it uses an animation preset type or custom curve {type: EASE_IN_AND_OUT, easingFunctionCubicBezierL {...}} ect..
            const entry = {
                name: [element.name],
                reactions: {
                  action: element.reactions[0].action,
                  trigger: element.reactions[0].trigger
                  // transition: {
                  //   type: element.reactions[0].action.transition.type,
                  //   easing: element.reactions[0].action.transition.easing,
                  //   duration: element.reactions[0].action.transition.duration
                  // }
                }
            }
            Object.assign(file, entry)
            jsonFile.push(entry);
            //console.log('jsonFile : ' , jsonFile)
            // if('easingFunctionCubicBezier' in element.reactions[0].action.transition.easing){
            //   console.log('CUSTOM CURVE BEZIER : ', element.reactions[0].action.transition.easing.easingFunctionCubicBezier)
            // }
            // if('easingFunctionSpring' in element.reactions[0].action.transition.easing){
            //   console.log('CUSTOM CURVE SPRING : ', element.reactions[0].action.transition.easing.easingFunctionSpring)
            // } else{
            //   console.log('STANDARD EASING PRESET : ', element.reactions[0].action.transition.easing)
            // }
          }
         }
       }
     }
   });
  }
}