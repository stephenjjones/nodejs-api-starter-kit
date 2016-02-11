import React from 'react';
import Card from 'material-ui/lib/card/card';
import CardActions from 'material-ui/lib/card/card-actions';
import CardHeader from 'material-ui/lib/card/card-header';
import RaisedButton from 'material-ui/lib/raised-button';
import CardText from 'material-ui/lib/card/card-text';

const RecipeListItem = ({recipe}) => (
  <Card>
    <CardHeader
      title={recipe.name}
      subtitle={recipe.category}
      actAsExpander={true}
      showExpandableButton={true}
    />
    <CardText expandable={true} >
      {recipe.overview}
    </CardText>
    <CardActions expandable={true}>
      <RaisedButton label="Delete" primary={true} />
      <RaisedButton label="Edit" secondary={true} />
    </CardActions>
  </Card>
);

export default RecipeListItem;
