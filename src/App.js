import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import AlbumIcon from '@material-ui/icons/Album';
import GitHubIcon from '@material-ui/icons/GitHub';
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
import ListSearch from './ListSearch/ListSearch';
import axios from 'axios';
import { css } from '@emotion/core';
import PropagateLoader from 'react-spinners/PropagateLoader';


const override = css`
    display: block;
    margin: 0 auto;
`;

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 0),
  },
  loadingDiv: {
    alignItems: 'center',
    background: 'rgba(255, 255, 255, 0.66)',
    display: 'flex',
    height: '100%',
    justifyContent: 'center',
    position: 'absolute',
    width: '100%',
    zIndex: 2
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
  switchContainer: {
    minWidth: 190,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    marginTop: 'auto',
    padding: theme.spacing(4)
  },
  footerIcon: {
    fontSize: 13,
    marginRight: 5
  }
}));

/**
 * @name App
 * @author Márcio José Gurka Júnior
 * @description App Component - Main component where all the application is started
 */

export default function App() {
  const classes = useStyles();
  const [values, setValues] = React.useState({
    search: '',
    items: [],
    searchAlbum: true,
    searchUrl: "",
    hasError: false,
    isLoading: false,
  });

  const handleChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleCheckChange = name => event => {
    setValues({ ...values, [name]: event.target.checked });
  };

  /**
   * @name fetchData
   * @author Márcio José Gurka Júnior
   * @description Function that retrieve the data from the iTunes API
   */
  const fetchData = async () => {
    let url = `https://itunes.apple.com/search?term=${values.search}&entity=${(values.searchAlbum) ? `album` : `song`}`;
    if(!values.isLoading) {
      setValues({ ...values, hasError: false, isLoading: true });
      try {
        const result = await axios(url);
        setValues({ ...values, items: result.data.results, isLoading: false });
      } catch (error) {
        setValues({ ...values, hasError: true, isLoading: false });
      }
    }
  }

  return (
    <main className={classes.root}>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <AlbumIcon className={classes.icon} />
          <Link variant="h6" color="inherit" noWrap href="/">
            React iTunes App
          </Link>
        </Toolbar>
      </AppBar>
      <main>
        { values.isLoading && 
          <div className={classes.loadingDiv}>
            <PropagateLoader
              css={override}
              sizeUnit={"px"}
              size={40}
              color={'#123abc'}
              loading={values.isLoading}
            />
          </div> 
        }
          
        {/* Hero unit */}
        <div className={classes.heroContent}>
          <form onSubmit={ event => {
            event.preventDefault();
            fetchData();
          }}>
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
                <Grid container spacing={2} justify="center" alignItems="flex-end">
                  <Grid item xs>
                    <FormControl className={classes.textField}>
                      <InputLabel htmlFor="search-text">What album/music are you looking for?</InputLabel>
                      <Input
                        id="search-text"
                        type={'text'}
                        value={values.search}
                        fullWidth
                        onChange={handleChange('search')}
                        required
                      />
                    </FormControl>
                  </Grid>
                  <Grid className={classes.flexContainer} item>
                    <Typography component="div" className={classes.switchContainer}>
                      <Grid component="label" container alignItems="center" justify="center" spacing={1}>
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
                  <Grid className={classes.flexContainer} item>
                    <Button variant="contained" color="primary" id="search-btn" type="submit">
                      Search
                    </Button>
                  </Grid>
                </Grid>
              </div>
            </Container>
          </form>
        </div>
        <ListSearch items={values.items} searchAlbum={values.searchAlbum} search={values.search}/>
      </main>
      {/* Footer */}
      <footer className={classes.footer}>
        <Typography variant="subtitle1" align="center" color="textSecondary" component="div">
          Made with <span role="img" aria-label="heart">♥️</span> by {' '}
          <Link color="inherit" href="https://marciogurka.com/">
            @marciogurka
          </Link>
          <Typography variant="body2" color="textSecondary" align="center" component="p">
            <Link color="inherit" href="https://github.com/marciogurka/react-itunes-api">
              <GitHubIcon className={classes.footerIcon}/>
              Check the source code.
            </Link>
          </Typography>
        </Typography>
      </footer>
      {/* End footer */}
    </main>
  );
}