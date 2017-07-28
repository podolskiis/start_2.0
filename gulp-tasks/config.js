var
  login             = 'admin',
  password          = 'admin',
  project           = '2017/07/test';
module.exports = {
  path: {
    app: {
      home:         'app/',
      sass: {
        src:        'app/sass/main.scss',
        dest:       'app/css/',
        watch:      'app/sass/**/*.+(scss|sass)',
        rename:     'theme.css'
      },
      pug: {
        src:        'app/pug/pages/*.pug',
        dest:       'app/',
        watch:      'app/pug/pages/*.pug',
        json:       'app/pug/data.json'
      },
      bower: {
        src:        'app/pug/**/{head,scripts}.pug',
        dest:       'app/pug/',
        watch:      'bower.json'
      },
      js: {
        watch:      'app/js/*.js'
      }
    }
  },
  dist: {
    home:           'www/',
    img: {
      src:          'app/images/**',
      dest:         'www/images/'
    },
    useref: {
      src:          'app/*.html',
      dest:         'www/'
    },
    import: {
      css: {
        src:        'app/css/*.css',
        dest:       'www/css/'
  	  },
      fonts: {
        src:        'app/fonts/**',
        dest:       'www/fonts/'
  	  },
      js: {
        src:        'app/js/**',
        dest:       'www/js'
  	  },
      dop: {
        src: [
                    'app/*.ico',
                    'app/.htaccess'
        ],
        dest:       'www/'
  	  }
    },
    size:           'www/**'
  },
  ftp: {
    home:           'www/',
    url:            'sergeypodolsky.ru/public_html/work/'+project,
    conn: {
      host:         '92.53.96.109',
      user:         login,
      password:     password,
      parallel:     10
    },
    globs: [
                    'www/**',
                    'www/**/.*'
    ]
  },
  ssh: {
    src: [
                    'www/**',
                    'www/**/.*'
    ],
    host: {
      root:         'www/',
      hostname:     login+'@vh54.timeweb.ru',
      destination:  'sergeypodolsky.ru/public_html/work/'+project,
      archive:      true,
      silent:       false,
      compress:     true
    }
  }
};
