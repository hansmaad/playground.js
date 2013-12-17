    
    
    var WorkspaceDefaultState = function(workspace) {
      this.workspace = workspace;
      this.clicked = undefined;
      this.mouseDownPosition = undefined;
      this.clickedPosition = undefined;    
    };

    WorkspaceDefaultState.prototype.handleMouseDown = function(element, $event) {
      this.clicked = element;
      this.mouseDownPosition = new Vector($event.layerX, $event.layerY);
      this.clickedPosition = new Vector(element.position.x, element.position.y);
      $event.preventDefault();
      this.workspace.message = "down\n";
      return false;
    };