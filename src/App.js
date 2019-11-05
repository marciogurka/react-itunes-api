import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import AlbumIcon from '@material-ui/icons/Album';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Switch from '@material-ui/core/Switch';

const useStyles = makeStyles(theme => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  textField: {
    width: '100%'
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
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
  flexContainer: {
    display: 'flex',
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(4),
  },
}));

export default function App() {
  const classes = useStyles();
  const [values, setValues] = React.useState({
    search: '',
    itens: [],
    searchAlbum: true,
  });

  const handleChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleCheckChange = name => event => {
    setValues({ ...values, [name]: event.target.checked });
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <AlbumIcon className={classes.icon} />
          <Typography variant="h6" color="inherit" noWrap>
            React iTunes App
          </Typography>
        </Toolbar>
      </AppBar>
      <main>
        {/* Hero unit */}
        <div className={classes.heroContent}>
          <Container maxWidth="md">
            <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
              Music search by {' '}
              <Link color="inherit" href="https://marciogurka.com/">
                @marciogurka
              </Link>
            </Typography>
            <Typography variant="h5" align="center" color="textSecondary" paragraph>
              Search an artist's album or song using the search below and get info from the iTunes API.
            </Typography>
            <div className={classes.heroButtons}>
              <Grid container spacing={2} justify="center"  alignItems="flex-end">
                <Grid item xs>
                  <FormControl className={classes.textField}>
                    <InputLabel htmlFor="search-text">What album/music are you looking for?</InputLabel>
                    <Input
                      id="search-text"
                      type={'text'}
                      value={values.search}
                      fullWidth
                      onChange={handleChange('search')}
                    />
                  </FormControl>
                </Grid>
                <Grid className={classes.flexContainer} item>
                  <Button variant="contained" color="primary" id="search-btn">
                    Search
                  </Button>
                </Grid>
                <Grid className={classes.flexContainer} item>
                <Typography component="div">
                  <Grid component="label" container alignItems="center" spacing={1}>
                    <Grid item>Music</Grid>
                    <Grid item>
                      <Switch
                        color="primary"
                        checked={!!values.searchAlbum}
                        onChange={handleCheckChange('searchAlbum')}
                        id="search-type"
                      />
                    </Grid>
                    <Grid item>Album</Grid>
                  </Grid>
                </Typography>
                </Grid>
              </Grid>
            </div>
          </Container>
        </div>
      </main>
      {/* Footer */}
      <footer className={classes.footer}>
        <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
          Made with <span role="img" aria-label="heart">♥️</span> by {' '}
          <Link color="inherit" href="https://marciogurka.com/">
            @marciogurka
          </Link>
        </Typography>
      </footer>
      {/* End footer */}
    </React.Fragment>
  );
}