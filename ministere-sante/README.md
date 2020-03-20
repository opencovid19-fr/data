# Données du Ministère de la Santé

Ces données proviennent du point quotidien video que le Ministère des Solidarités et de la Santé met en ligne sur DailyMotion.
La source est un lien url dailymotion.

Les données présentes dans les fichiers ont évolué au cours du temps, mais on la même structure : 

### a - Les données nationales

* Nombre de cas confirmés : la clé à indiquer dans le fichier est 'casConfirmes'
* Nombre de décès : la clé à indiquer dans le fichier est 'deces'
* Nombre de personnes hospitalisées : la clé à indiquer dans le fichier est 'hospitalises'
* Nombre de personnes en réanimation : la clé à indiquer dans le fichier est 'reanimation'
* Nombre de personnes guéries (qui sont sorties de l'hôpital) : la clé à indiquer dans le fichier est 'gueris'

:arrow_right: Ne pas mettre d'espaces entre les nombres. 255 000 --> 255000   
:arrow_right: Préciser en commentaires ( ``` # ``` ) les informations de contexte qui sont évoquées oralement et qui y sont liées comme les pourcentages. 

À préciser également en commentaire à la fin du fichier :
- la minute de la vidéo à laquelle commence l'énumération des données nationales 
- d'autres données comme le nombre tests par jour par ex, si elles sont énoncées.

Exemple de code: 

```
donneesNationales:
  casConfirmes: 10995
  deces: 372 # 6% ont moins de 60 ans
  hospitalises: 4461
  reanimation: 1122
  gueris: 1300
  ```
  
### b - Les données internationales

* Nombre de cas confirmés au niveau mondial
* Nombre de cas guéris
* Nombre de pays touchés
* Nombre de décès

Même consigne pour les clés de variable. 

Exemple de code: 

```
donneesMondiales:
  casConfirmes: 235000
  gueris: 84000
  paysTouches: 159
  deces: 9785 # 3200 en Chine, 4500 en Europe
  ```

###  Autres données 

Sur la capacité de lits, la capacite totale de lits disponibles (```capaciteTotaleLitsDisponibles```) est définie par la somme de :    
- la capacite de lits de réanimation (tous équipés de respirateurs)
- la capacité de lits de soins continus*
- la capacité de lits de soins intensifs

* _Les USC (Unités de Soins Continus) ont pour vocation de prendre en charge « des malades qui nécessitent, en raison de la gravité de leur état ou du traitement qui leur est appliqué, une observation clinique (incluant une surveillance rapprochée des paramètres vitaux) et biologique répétée et méthodique »._ 

Source : [Décret n° 2002-466 du 5 avril 2002 relatif aux conditions techniques de fonctionnement auxquelles doivent satisfaire les établissements de santé pour pratiquer les activités de réanimation, de soins intensifs et de surveillance continue](https://www.legifrance.gouv.fr/affichTexte.do?cidTexte=JORFTEXT000000585557&categorieLien=id) 
