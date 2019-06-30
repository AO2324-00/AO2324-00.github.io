(function(){
    'use.strict';
    let mte_count = 0;
    let mte_repaint_count = 0;
    let mtePath ='';
    let mte_data = document.getElementsByTagName("script");
    for (let mte_count = 0; mte_count < mte_data.length; mte_count++){
        if(mte_data[mte_count].outerHTML.match(/\/MTE.js/)){
            mte_data = mte_data[mte_count];
            break;
        }
    }
    let mte_option = ';'+mte_data.text.replace(/, /g, `,`).replace(/", /g, `;`).replace(/",\n/g, `;`).replace(/",/g, `;`);
    //console.log(mte_option);
    mte_option = mte_option.match(/[\=":\-\,.\(\)0-9\%a-z]*/g);
    for (mte_count = 0; mte_count < mte_option.length; mte_count++){
        mte_option[mte_count] = mte_option[mte_count].replace(/"/g, ``);
        if (mte_option[mte_count] === ""){mte_option.splice(mte_count, 1);if (mte_count > 0) mte_count--;}
    }
    //console.log(mte_option);
    mte_option = [{type:'circle', size:'10px', color:'blue', range:50, transition:'none', opacity:'1', render:'default', rotate:'none', translate:'(0,0)'},mte_option];
    for (mte_count = 0; mte_count < mte_option[1].length; mte_count++){
        if(mte_option[1][mte_count].match(/type=/)){
            mte_option[0].type = mte_option[1][mte_count].replace(/type=/, ``);
        }
        if(mte_option[1][mte_count].match(/size=/)){
            mte_option[0].size = mte_option[1][mte_count].replace(/size=/, ``);
        }
        if(mte_option[1][mte_count].match(/color=/)){
            mte_option[0].color = mte_option[1][mte_count].replace(/color=/, ``);
        }
        if(mte_option[1][mte_count].match(/range=/)){
            mte_option[0].range = Number(mte_option[1][mte_count].replace(/range=/, ``));
        }
        if(mte_option[1][mte_count].match(/transition=/)){
            mte_option[0].transition = mte_option[1][mte_count].replace(/transition=/, ``);
        }
        if(mte_option[1][mte_count].match(/opacity=/)){
            mte_option[0].opacity = mte_option[1][mte_count].replace(/opacity=/, ``);
        }
        if(mte_option[1][mte_count].match(/render=/)){
            mte_option[0].render = mte_option[1][mte_count].replace(/render=/, ``);
        }
        if(mte_option[1][mte_count].match(/rotate=/)){
            mte_option[0].rotate = mte_option[1][mte_count].replace(/rotate=/, ``);
        }
        if(mte_option[1][mte_count].match(/translate=/)){
            mte_option[0].translate = mte_option[1][mte_count].replace(/translate=/, ``);
        }
    }
    mte_option = mte_option[0];
    //console.log(mte_option);
    let mte_effect = '';
    for (mte_count = 0; mte_count < mte_option.range; mte_count++){
        mte_effect += '<effect class="effect effect'+ mte_count +'"></effect>';
    }
    switch(mte_option.type){
        case 'square':mte_option.type = ['',mte_option.type];break;
        case 'circle':mte_option.type = ['border-radius:50%',mte_option.type];break;
        case 'rhomb':mte_option.type = ['clip-path:polygon(50% 0, 100% 50%, 50% 100%, 0% 50%)',mte_option.type];break;
        case 'star':mte_option.type = ['clip-path:polygon(50% 0%, 20% 100%, 100% 40%, 0% 40%, 80% 100%)',mte_option.type];break;
        case 'hexagon':mte_option.type = ['clip-path:polygon(25% 0, 75% 0, 100% 50%, 75% 100%, 25% 100%, 0% 50%)',mte_option.type];break;
        case 'dog':
        case 'cat':
            mtePath = '<svg version="1.1" id="Layer_1" viewBox="0 0 100 100"><clipPath id="mtePath" clipPathUnits="objectBoundingBox" transform="scale(0.00146, 0.0018)">'+
                        '<path d="M191.4,164.127c29.081-9.964,44.587-41.618,34.622-70.699c-9.952-29.072-41.6-44.592-70.686-34.626c-29.082,9.956-44.588,41.608-34.632,70.69C130.665,158.582,162.314,174.075,191.4,164.127z"></path>'+
                        '<path d="M102.394,250.767v0.01c16.706-25.815,9.316-60.286-16.484-76.986c-25.81-16.691-60.273-9.316-76.978,16.489v0.01c-16.695,25.805-9.306,60.268,16.495,76.958C51.236,283.957,85.694,276.573,102.394,250.767z"></path>'+
                        '<path d="M320.6,164.127c29.086,9.948,60.734-5.545,70.695-34.636c9.956-29.081-5.55-60.734-34.631-70.69c-29.086-9.966-60.734,5.555-70.686,34.626C276.013,122.509,291.519,154.163,320.6,164.127z"></path>'+
                        '<path d="M256,191.489c-87.976,0-185.048,121.816-156.946,208.493c27.132,83.684,111.901,49.195,156.946,49.195c45.045,0,129.813,34.489,156.945-49.195C441.048,313.305,343.976,191.489,256,191.489z"></path>'+
                        '<path d="M503.068,190.289v-0.01c-16.705-25.805-51.166-33.18-76.976-16.489c-25.801,16.7-33.19,51.171-16.486,76.986v-0.01c16.7,25.806,51.158,33.19,76.968,16.481C512.374,250.557,519.764,216.095,503.068,190.289z"></path>'+
                    '</clipPath></svg>';
            mte_option.type = ['clip-path:url(#mtePath)',mte_option.type];break;
    }
    //if(mte_option.size.match(/[0-9]-[0-9]/))mte_option.size = ['',mte_option.size];else {mte_option.size = [mte_option.size,null];mte_option.size[0]='width:'+mte_option.size[0]+';height:'+mte_option.size[0]+';';}
    //console.log(mte_option.size);
    mte_option.size = mte_option.size.split(',');
    //console.log(mte_option.size);
    for(mte_count = 0; mte_count < mte_option.size.length; mte_count++){
        mte_option.size[mte_count] = [mte_option.size[mte_count].match(/[0-9\.\-]*/), mte_option.size[mte_count].match(/[a-z%][a-z]?[a-z]?[a-z]?/)];
        //console.log(mte_option.size);
        mte_option.size[mte_count][0] = mte_option.size[mte_count][0][0];
        mte_option.size[mte_count][1] = mte_option.size[mte_count][1][0];
    }
    //console.log(mte_option.size);
    if(mte_option.color.match(/%/))mte_option.color = ['',null];else mte_option.color = [mte_option.color,null];
    switch(mte_option.render){
        case 'defalt':mte_option.render = 1;break;
        case 'drag':mte_option.render = 0;break;
    }
    switch(mte_option.rotate){
        case 'none':mte_option.rotate = ['0deg',0];break;
        case 'follow':mte_option.rotate = ['',2,0,0];break;
        default:mte_option.rotate = [mte_option.rotate,1];break;
    }
    mte_option.translate = mte_option.translate.replace(/\(/g, ``);
    mte_option.translate = mte_option.translate.split('),');
    for(mte_count = 0;mte_count < mte_option.translate.length; mte_count++){
        mte_option.translate[mte_count] = mte_option.translate[mte_count].replace(/\)/g, ``);
        mte_option.translate[mte_count] = mte_option.translate[mte_count].split(',');
    }
    //console.log(mte_option.translate);
    mte_data.insertAdjacentHTML('afterend',
        '<mte>'+mte_effect+
        '<style id="mte_basic_style">.effect{'+mte_option.type[0]+';-webkit-'+mte_option.type[0]+';-moz-'+mte_option.type[0]+';-ms--webkit-'+mte_option.type[0]+';'+
        'background:'+mte_option.color[0]+';opacity:'+mte_option.opacity+';display:inline;position:fixed;backface-visibility:hidden; pointer-events: none;-moz-user-select:none;-webkit-user-select:none;-ms-user-select:none;user-select:none;}</style>'+mtePath);
    let mte_effects = [];
    for(mte_count = 0;mte_count < mte_option.range; mte_count++){
        mte_effects.push(document.getElementsByClassName('effect'+mte_count)[0]);
    }
    //console.log(mte_effects);
    //console.log(mte_option.size);
    function mte_random(mte_random_input){
        return Math.floor(Math.random() * (mte_random_input[1]-mte_random_input[0]+1)) + Number(mte_random_input[0]);
    }
    function onMoveEvent(mte_clientX, mte_clientY){
        if(mte_option.rotate[1] == 2){
            mte_option.rotate[0] = Math.atan2(mte_clientY - mte_option.rotate[3],mte_clientX - mte_option.rotate[2])
            mte_option.rotate[2] = mte_clientX;
            mte_option.rotate[3] = mte_clientY;
            mte_option.rotate[0] = (mte_option.rotate[0]+1.570796326795)+'rad';
            //console.log(mte_option.rotate[0]);
        }
        let onMoveEvent_count = mte_option.size[(mte_repaint_count+1)%mte_option.size.length][0];
        //console.log(onMoveEvent_count);
        if(onMoveEvent_count.match(/-/)){
            onMoveEvent_count = onMoveEvent_count.split('-');
            //console.log(onMoveEvent_count);
            onMoveEvent_count = mte_random(onMoveEvent_count);
        }
        //console.log(onMoveEvent_count);
        onMoveEvent_count = onMoveEvent_count+mte_option.size[(mte_repaint_count+1)%mte_option.size.length][1]
        onMoveEvent_count = 'width:'+onMoveEvent_count+';height:'+onMoveEvent_count+';';
        //console.log(onMoveEvent_count);
        //console.log(document.getElementsByClassName('effect'+mte_repaint_count)[0]);
        //console.log(mte_option.translate[(mte_repaint_count+1)%mte_option.translate.length])
        mte_effects[mte_repaint_count].innerHTML = '<style>.effect'+ mte_repaint_count +'{top:'+mte_clientY+'px;left:'+mte_clientX+'px;'+onMoveEvent_count+' transform:rotateZ('+mte_option.rotate[0]+') translateX('+(mte_option.translate[(mte_repaint_count+1)%mte_option.translate.length][0]-50)+'%) translateY('+(mte_option.translate[(mte_repaint_count+1)%mte_option.translate.length][1]-50)+'%);}</style>';
        if(mte_repaint_count < mte_option.range-1){
            mte_repaint_count++;
        }else mte_repaint_count = 0;
        
    }
    let mte_drag = 0;
    if(mte_option.render == 0){
        document.addEventListener('mousedown',function(){mte_drag = 1;});
        document.addEventListener('mouseup',function(){mte_drag = 0;});
    } else mte_drag = 1;
    //console.log(mte_option.type);
    switch(mte_option.type[1]){
        case 'rhomb':
        case 'cat':
        case 'dog':
        case 'star': for(mte_count = 0; mte_count < mte_option.range-1;mte_count++){onMoveEvent(-100, -100);}break;
    }
    document.onmousemove = function(e){if(mte_drag == 1)onMoveEvent(e.clientX, e.clientY);}
    document.addEventListener('touchmove',function(e){onMoveEvent(e.touches[0].clientX, e.touches[0].clientY);});
    console.log("MTE.js: Loaded ver β");
})();