if [[ ! -r ${0:A:h}/.bundle/config && -x $(command -vp bundle) ]] ; then
	echo 'Configuring Bundler...'
	bundle config --local path "${0:A:h}/vendor/bundle"
	bundle config --local bin "${0:A:h}/vendor/bundle/bin"
	bundle config --local auto_install true
fi

autostash PATH="${0:A:h}/vendor/bundle/bin:${0:A:h}/node_modules/.bin:${PATH}"
