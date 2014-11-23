var tree = d3.layout.tree()
    .size([550, 550]);

var diagonal = d3.svg.diagonal()
    .projection(function(d){ return [d.y, d.x]; });

var svg = d3.select('body')
            .append('svg')
                .attr('width', 700)
                .attr('height', 700)
            .append('g')
                .attr('transform', 'translate(50, 50)');


function displayState(states){

    debugger;

    states = states.slice();

    var len = states.length;

    // Loop throw potentials childs
    for(var i = 0; i < len; i++){

        // Loop throw potentials parents
        for(var j = 0; j < len; j++){

            // If i is a child of j
            if(states[i].name !== states[j].name && stateIsChildOf(states[i], states[j])){

                states[i]._uiRInsp_haveAParent = true;

                if(states[j].children){
                    states[j].children.push(states[i]);
                }
                else{
                    states[j].children = [states[i]];
                }

                break;
            }

        }
    }


    // deleting every state that have a parent

    var finalStates = [];

    for(var i = 0; i < len; i++){
        if(states[i]._uiRInsp_haveAParent){
            delete states[i]._uiRInsp_haveAParent;
        }
        else{
            finalStates.push(states[i]);
        }
    }


    if(finalStates.length === 1){
        states = finalStates[0];
    }
    else{
        states = {
            name: '',
            children: finalStates,
        };
    }


    var nodes = tree.nodes(states);
    var links = tree.links(nodes);

    var link = svg.selectAll('.link')
        .data(links)
        .enter()
        .append('path')
            .attr('class', 'link')
            .attr('d', diagonal)
            .attr('fill', 'none')
            .attr('stroke', 'black');

    var node = svg.selectAll('.node')
        .data(nodes)
        .enter()
        .append('g')
            .attr('class', 'node')
            .attr('transform', function(d){ return 'translate(' + d.y + ', ' + d.x + ')'; });

    node.append('circle')
        .attr('r', 4.5);

    node.append('text')
        .attr('dy', '.31em')
        .attr('transform', 'translate(-10, -10)')
        .text(function(d) { return d.name; });
}


/*function treeMap(array, fn){

    for(var i = 0, len = array.length; i < len; i++){
        var item = array[i];

        if(item.children !== null && item.children !== undefined && item.children.length > 0){
            treeMap(item.children, fn);
        }

        fn(item);
    }
}*/

function stateIsChildOf(child, parent){

    if(child.parent){
        return child.parent === parent.name;
    }

    var potentialParentName = child.name.toString().split('.').slice(0, -1).join('.');

    if(potentialParentName === parent.name){
        return true;
    }

    return false;
}
