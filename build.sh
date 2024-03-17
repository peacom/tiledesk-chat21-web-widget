rimraf ./dist
rimraf ./widget.tar
npm run build2
tar -cvzf widget.tar dist