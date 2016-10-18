pusha upp: 
git subtree push --prefix dist origin gh-pages

när det skiter sig:
git push origin `git subtree split --prefix dist  master`:gh-pages --force