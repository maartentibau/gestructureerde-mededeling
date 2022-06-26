# Gestructureerde Mededeling

![Github Actions](https://github.com/maartentibau/gestructureerde-mededeling/actions/workflows/build-test-deploy.yml/badge.svg) ![codecov](https://img.shields.io/codecov/c/gh/maartentibau/gestructureerde-mededeling/master?logo=codecov)

![GitHub package.json dependency version (prod)](https://img.shields.io/github/package-json/dependency-version/maartentibau/gestructureerde-mededeling/@angular/core) ![GitHub package.json dependency version (prod)](https://img.shields.io/github/package-json/dependency-version/maartentibau/gestructureerde-mededeling/@angular/material) ![GitHub package.json dependency version (prod)](https://img.shields.io/github/package-json/dependency-version/maartentibau/gestructureerde-mededeling/@nrwl/angular) ![GitHub package.json dependency version (prod)](https://img.shields.io/github/package-json/dependency-version/maartentibau/gestructureerde-mededeling/rxjs)

Een overschrijving met gestructureerde mededeling of OGM is een combinatie van drie groepen van drie, vier en vijf cijfers gescheiden door een schuine streep.

Deze mededeling wordt in België vaak gebruikt om overschrijvingen automatisch te kunnen laten verwerken. Zo weet het computersysteem van de ontvanger onmiddellijk welke factuur betaald wordt. Op deze manier is er geen personeel nodig om te gaan kijken welke rekeningen vereffend werden.

De eerste tien cijfers zijn bijvoorbeeld een klantennummer of een factuurnummer. De laatste twee cijfers vormen het controlegetal dat verkregen wordt door van de voorgaande tien cijfers de rest bij Euclidische deling door 97 te berekenen (modulo 97). Uitzondering: Indien de rest 0 bedraagt, dan wordt als controlegetal 97 gebruikt.

Voor en achter de cijfers worden drie plussen (+++) of sterretjes (***) gezet.

Bron: [[wikipedia]](https://nl.wikipedia.org/wiki/Gestructureerde_mededeling)
