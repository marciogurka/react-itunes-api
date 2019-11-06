import React from 'react';
import Button from '@material-ui/core/Button';
import LibraryMusicIcon from '@material-ui/icons/LibraryMusic';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import CardActionArea from '@material-ui/core/CardActionArea';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles(theme => ({
  resultsInfo: {
    marginBottom: theme.spacing(6),
    textAlign: 'center'
  },
  textField: {
    width: '100%'
  },
  gifContainer: {
    display: 'flex',
    justifyContent: 'center',
    margin: 0,
    width: '100%'
  },
  gifImg: {
    maxHeight: '100%'
  },
  noResultsSpan: {
    display: 'block',
    marginBottom: theme.spacing(3)
  },
  cardGrid: {
    paddingTop: theme.spacing(6),
    paddingBottom: theme.spacing(6),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  cardAction: {
    bottom: 0,
    position: 'absolute'
  }
}));

export default function ListSearch({items, searchAlbum, search}) {
  const classes = useStyles();
  const [values, setValues] = React.useState({
    items,
    searchAlbum,
    search
  });

  React.useEffect(() => {
    setValues({ items, search })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items]);


  return (
    <React.Fragment>
    <Container className={classes.cardGrid} maxWidth="md">
      {
        (values.items && values.items.length > 0) &&
        <div className="results-div">
          <Typography gutterBottom variant="h5" component="h2" className={classes.resultsInfo}>
            Top {values.items.length} results for "{ values.search }":
          </Typography>
          <Grid container spacing={4}>
          
          {values.items.map((item, i) => (
            <Grid item key={i} xs={12} sm={6} md={4}>
              <Card className={classes.card}>
                <CardActionArea href={item.collectionViewUrl}>
                    <CardMedia
                    className={classes.cardMedia}
                    image={item.artworkUrl100}
                    title={item.collectionCensoredName}
                    />
                    <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                      { item.artistName }
                    </Typography>
                    <Typography>
                      { item.collectionCensoredName }
                    </Typography>
                    </CardContent>
                  </CardActionArea>
                  <CardActions>
                    <Button size="small" color="primary" href={item.collectionViewUrl} startIcon={<LibraryMusicIcon />}>
                      Listen on iTunes
                    </Button>
                  </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
        </div>
      }
      {
        (!values.items || values.items.length === 0) &&
          <Grid container spacing={4} className="no-results-info" justify="center">
            { values.search && 
              <Typography variant="h5" align="center" color="textSecondary" paragraph>
                <Typography variant="h5" align="center" color="textSecondary" component="span" className={classes.noResultsSpan}>
                  There is no results for "{ values.search }"
                </Typography>
                <Box component="div" m={1} className={classes.gifContainer}>
                  <img className={classes.gifImg} src="https://media.giphy.com/media/l41lOzTIL8lfZ15fy/giphy.gif" alt="No results"/>
                </Box>
              </Typography>
            }
            { !values.search && 
              <Box component="div" m={1} className={classes.gifContainer}>
                <img className={classes.gifImg} src="https://media.giphy.com/media/3oKIPd3Uwz7lqZW9uo/giphy.gif" alt="Welcome"/>
              </Box>
              
            }
          </Grid>
      }
    </Container>
    </React.Fragment>
  );
}