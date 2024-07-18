# Git  para economistas

La idea de este repositorio es documentar los beneficios del uso de *Git* y *GitHub* en ciencias sociales. La documentación esta diseñada para que personas sin experiencia previa entiendan las ventajas de este sistema de control de versión y tengan una idea de cómo incorporarlo en su estructura de trabajo. Debería ser fácil para el usuario entender los alcances para el desarrollo de cualquier aplicación que utilice archivos de texto como insumo.

Es importante entender que los sistemas de control de versión no sustituyen la buena organización personal y grupal. Las malas prácticas que mantenemos en nuestra vida digital tienden a replicarse usando Git, y sus consecuencias pueden empeorar si los usuarios no son consientes de ellas. No existe una estrategia única para evitar esto: claramente depende del tipo de proyecto en el que se trabaje (e.g. no es lo mismo trabajar de a 2 personas que de a 50). En este documento trataremos de mencionar lo que por experiencia consideramos "mejores prácticas" y prácticas que creemos se deben evitar.

Revisa la presentación [AQUI](https://nicofranzp.github.io/Git4Econ/)

## Introducción

### Qué nos dice chatGPT sobre versionar nuestro trabajo

Entender el mundo depende cada vez más de conjuntos de datos complejos, software estadístico y proyectos colaborativos. En este contexto, los **sistemas de control de versiones (VCS)  buscan documentar ordenadamente los cambios que se realizan en los archivos dentro de un proyecto**. Las razones del porqué esto es deseado para los investigadores y analistas se sintetiza en los siguientes puntos:

1. **Reproducibilidad y Transparencia**: Uno de los principios fundamentales de la investigación científica es la reproducibilidad. El control de versiones asegura que cada cambio realizado en un proyecto sea rastreado y documentado, permitiendo que otros investigadores puedan replicar los resultados con precisión. Al mantener un historial completo de modificaciones, los investigadores pueden proporcionar transparencia en sus metodologías, mejorando la credibilidad y la fiabilidad de sus hallazgos.

2. **Colaboración**: la investigación a menudo implica la colaboración entre varias personas, a veces en diferentes instituciones y países. El control de versiones facilita una colaboración fluida al permitir que múltiples colaboradores trabajen en el mismo proyecto simultáneamente. Los cambios realizados por diferentes miembros del equipo se pueden fusionar de manera eficiente y los conflictos se pueden resolver de forma sistemática. Este aspecto colaborativo es crucial para los proyectos de investigación económica a gran escala que requieren la contribución de diversas especialidades.

3. **Gestión de Errores**: en cualquier proyecto de investigación, los errores son inevitables. El control de versiones proporciona una red de seguridad al permitir que los investigadores vuelvan a versiones anteriores de su trabajo si se descubre un error. Esta característica es particularmente valiosa en el análisis de datos, donde un error en el código o en la manipulación de datos puede llevar a inexactitudes significativas. Al mantener un historial de cambios, los investigadores pueden identificar cuándo y dónde se introdujo un error y corregirlo sin comprometer todo el proyecto.

4. **Organización del Proyecto**: los proyectos de investigación en economía a menudo implican numerosos archivos, incluidos conjuntos de datos, scripts, informes y revisiones de literatura. El control de versiones ayuda a organizar estos archivos de manera sistemática. Los investigadores pueden crear ramas para diferentes aspectos del proyecto, como limpieza de datos, análisis y redacción. Esta estructura organizativa facilita la gestión de proyectos complejos y asegura que todos los componentes se integren sin problemas.

5. **Documentación**: Los sistemas de control de versiones permiten una documentación detallada de los cambios a través de mensajes de confirmación. Estos mensajes proporcionan contexto y razones para las modificaciones, lo cual es invaluable para entender la evolución de un proyecto. Esta documentación ayuda tanto a los miembros actuales del equipo como a futuros investigadores que puedan construir sobre el trabajo. Asegura la continuidad y preserva el conocimiento adquirido durante el proceso de investigación.

6. **Adaptabilidad**: La investigación económica es a menudo iterativa, con hipótesis iniciales que se prueban, revisan y refinan basadas en resultados preliminares. El control de versiones apoya este proceso iterativo al permitir que los investigadores experimenten con diferentes enfoques sin temor a perder trabajos anteriores. Se pueden crear ramas para diferentes hipótesis o metodologías, y las más prometedoras se pueden fusionar en el proyecto principal a medida que avanza la investigación.

7. **Publicación y Revisión**: Al enviar investigaciones para su publicación, a menudo se requiere que los economistas proporcionen sus datos y código para revisión por pares. Los sistemas de control de versiones facilitan este proceso al ofrecer un historial claro y accesible del proyecto de investigación. Los revisores pueden examinar el código, entender los cambios realizados y verificar los resultados, mejorando así la integridad del proceso de revisión por pares.

### La vida de antes de Git

Antes de la aparición de los sistemas de control de versiones, los investigadores dependían de métodos manuales y menos eficientes para gestionar sus proyectos y colaborar con otros. Estos métodos tradicionales presentan varios desafíos y a menudo llevan a confusión, ineficacias y errores.

 * Corros electronicos
 * Dropbox, onedrive y GoogleDrive
 * Usabilidad del versionamiento a-la Office
 * Comentarios en los códigos
 * versionamiento manual (carpeta Old)

<center>
	<figcaption>Naive Version Control</figcaption>
	<img src="./src/images/projectBeforeGit.png"></img>
</center>

### Como funciona el versionamiento?

A diferencia de nuestro sistema "naive" en la figura arriba, los desarrolladores de software ---que vienen pensando en este problema por décadas--- han encontrado soluciones tanto cómodas (facilidad para trazar cambios), como eficientes (rápidas y que ocupan poca memoria). Todos ellos se basan en el registro de fotografías tomadas en un momento determinado.

Para entender cómo funcionan los sistemas de control de version es bueno introducir un poco de la jerga[^whyEnglish]. Un **repository** (los lolos les llaman "repo") es un conjunto de archivos y su historial desde su creación, mientras que  **working copy** corresponde a una versión particular del repositorio. Las fotografías tomadas en un momento determinadas se conocen como **commits**.  Así, los repositorios nacen cuando el usuario hace el primer *commit* de su proyecto.

En la mayoría de los sitemas de control de version estos *commits* se hacen de forma manual. A diferencia de algunas aplicaciones que buscan respaldar el trabajo realizado en el corto plazo, el control de versión privilegia la voluntad del usuario para comprometer los cambios.[^currentWorkBackUp]

Con las definiciones anteriores en mano, podemos subdividir los sistemas de control de versión por tres aspectos:

*   *Locales*: mantienen la información de todos los cambios de manera local (i.e. en el computador del usuario). El problema de este tipo de sistemas es que no permiten la colaboración.

* *No distribuidos*: mantienen el repositorio en un servidor y le entregan una copia de trabajo a cada usario. Para que otros usuarios vean mi avance, yo tengo que hacer un *commit* y ellos tienen que hacer un **update** de la copia de trabajo que están usando. La principal ventaja de los sistemas no distribuidos es que permiten la colaboración y que el tráfico de datos es menor. No obstante, el riesgo de perderlo todo depende de qué tan seguro sea el servidor central.

* *Distribuidos*: le entrega el repositorio completo a cada usuario. Esto minimiza la posibilidad de una pérdida catastrófica. Además, agiliza la revision de versiones pasadas sin tener que estar conectados al servidor central. Para que mis colaboradores puedan ver los cambios que he hecho primero tengo que hacer el *commit* de los cambios y luego enviarlos al servidor --- acto conocido como **push** --- , luego ellos tienen que solicitar al servidor los cambios del repositorio  --- **pull**--- y pasar los cambios a su copia de trabajo.

<center>
    <figcaption>Non-distributed version control system </figcaption>
    <img src="./src/svg/nonDistributedVCS.svg" width=80% float= left></img>
</center>

<center>
    <figcaption>Distributed version control system </figcaption>
    <img src="./src/svg/distributedVCS.svg" width=80% float= left></img>
</center>

En conclusión, un sistema de control de versión es un secretario que mantiene registros de toda la información relevante respecto de cambios hechos en un trabajo compuesto por uno o más archivos. El software elabora dichos registros cuando los usuarios están listos para "comprometer" los cambios. A pesar de que el los sitemas no distribuidos tienen menos pasos para que los cambios que hacemos puedan ser vistos por nuestros colaboradores, y que la copia de trabajo sea mas liviana en comparacion con los sitemas distribuidos, los beneficions de estos últimos --- seguridad, rapidez, comodidad--- dominan fuertemente en comparación con sus deficiencias. Esto hace que sistemas como Git y Mercurial (ambos distribuidos) sean los mas utilizados en en mundo.

### Qué es Git? y qué es GitHub?

<center>
    <figcaption> GIT, banda de rock de los 80's</figcaption>
	<img src="https://upload.wikimedia.org/wikipedia/commons/0/03/Git_banda_argentina.jpg"></img>
</center>

A diferencia de la banda de rock argentino G.I.T., **Git es un software de control de versiones distribuido que se ha popularizado exponencialmente en los últimos 20 años**. A pesar de su popularidad, existen muchos mitos y confusión sobre su uso y capacidades. Esto se debe principalmente a que su masificación se ha logrado mediante interfaces de usuario (UI) que lo hacen más accesible y amigable para los usuarios. Por ejemplo, hoy en día, muchos economistas conocen o han escuchado hablar de la plataforma GitHub, pero no necesariamente comprenden las diferencias entre esta y Git.

Git fue creado en 2005 por [Linus Torvalds](https://en.wikipedia.org/wiki/Linus_Torvalds) para el desarrollo del sistema operativo Linux. Esencialmente, Git registra los cambios de una versión a otra y presenta al usuario la suma de todos esos cambios, algo así como la integral de una derivada. La principal ventaja de este sistema es que está optimizado para ser rápido y eficiente en el uso de espacio, además de disminuir la probabilidad de una pérdida catastrófica de código.

Git es un software que se instala en el computador de los usuarios y puede ser utilizado de forma local, sin necesidad de un servidor o acceso a internet. Una vez instalado, el usuario puede acceder a las utilidades del software a través de la línea de comando (Terminal en macOS o Command Prompt o PowerShell en Windows). Algunos sistemas operativos o aplicaciones (como Python, Anaconda) instalan Git por defecto, por lo que es posible que ya tengas Git en tu sistema. Para verificar esto, escribe `git --version` en el Terminal. Si está instalado, deberías ver un mensaje similar a este:

```shell
$ git --version
git version 2.24.3 (Apple Git-128)
```

GitHub, por otro lado, es una plataforma de desarrollo que permite a los programadores crear, almacenar, gestionar y compartir su código. Utiliza Git como base, pero añade una serie de características adicionales como control de acceso, seguimiento de errores, solicitudes de características de software, gestión de tareas, integración continua y wikis para cada proyecto. La principal diferencia entre Git y GitHub radica en que Git es una herramienta de línea de comandos para el control de versiones, mientras que GitHub es una plataforma en línea que facilita la colaboración y la gestión de proyectos a través de una interfaz gráfica fácil de usar.

El desarrollo de GitHub comenzó el 19 de octubre de 2007 y fue lanzado oficialmente en abril de 2008 por Tom Preston-Werner, Chris Wanstrath, P. J. Hyett y Scott Chacon, después de estar disponible durante unos meses como versión beta. El nombre "GitHub" es un compuesto de "Git" y "hub", reflejando su propósito de ser un centro de colaboración para proyectos gestionados con Git. En junio de 2018, Microsoft anunció la adquisición de GitHub por 7.5 mil millones de dólares en acciones, y la adquisición se finalizó en octubre de 2018. Desde entonces, GitHub ha continuado operando como una plataforma independiente, pero con el respaldo y los recursos adicionales de Microsoft, lo que ha permitido una mayor integración con otras herramientas y servicios de Microsoft, como Visual Studio Code y Azure.

## Como empezar a trabajar con Git


### Set up inicial


``` git
$ git config --global user.email "tu_email@ejemplo.com"
$ git config --global user.name "Tu Nombre o NickName"
```
Es [este link](https://www.atlassian.com/git/tutorials/setting-up-a-repository/git-config) se pueden encontrar mas opciones para configurar Git.

### Git init and clone

Para iniciar un repositotrio

```bash
~/your/path $ git init
Initialized empty Git repository in /your/path/.git/
```
Lo que este comando hace es crear una carpeta oculta `.git` en donde Git esconderá todo lo necesario para hacer su magia. Es esta carpoeta vive toda la historia del repositorio y como se relaciona con el resto del mundo. Si queremos pasar de tener un repositorio Git a no tener uno, simplemente debemos eliminar la carpeta `.git`

[mas informacion sobre `git init`](https://git-scm.com/docs/git-init)

Cuando queremos usar un proyecto que ya existe, debemos clonarlo desde donde vive remotamente. Para ello utilizamos

```bash
~/your/path $ git clone "url/to/remote/repo.git"
> Cloning into `remote`...
> remote: Counting objects: 10, done.
> remote: Compressing objects: 100% (8/8), done.
> remove: Total 10 (delta 1), reused 10 (delta 1)
> Unpacking objects: 100% (10/10), done.
```
[mas informacion sobre `git clone`](https://git-scm.com/docs/git-clone)

### Git add y Git commit

### Ramas

### El archivo `.gitignore`

## Como empezar a trabajar con GitHub

### Remotes
### Remotes
### Issues


## Buenas y malas practicas

Como se mencionó al inicio, muchas de las malas prácticas que los usuarios usamos a la hora de organizar los proyectos se pueden replicar utilizando Git. Algunas de la recomendaciones para evitar que esto suceda son:
1. **Hacer *commits* frecuentes y darles un nombre con sentido**: la idea es evitar la vieja práctica de nombrar las versiones como "version final", "version final final", y comprometerse a informar al "yo"  del futuro (o potenciales colaboradores) cuáles son los principales objetivos de este *commit*.  En nuestro ejemplo los cambios son sencillos: todos son actualizaciones del archivo `Readme.md`.
2. **Utilizar el *staging area* para ordenar los commits**: es probable que durante un proyecto se avance en varios aspectos al mismo tiempo. A la hora de pensar en comprometer los cambios, vale la pena ver si
3. **Usar ramas para experimentar**: cuando de estén probando nuevas


- [Por qué elegir MarkDown](https://ubc-library-rc.github.io/intro-markdown/slides/#/)

#### NOTAS
[^whyEnglish]: Para ayudar a incorporar los comandos a la parte de largo plazo de nuestro cerebro.

[^currentWorkBackUp]: Los sistemas de control de version trabajan independientemente de las aplicaciones que se usen para editar los documentos. Esto es importante porque si el usuario prefiere usar aplicaciones que guarden copias temporales, el control de versión no va a afectar esta preferencia.

[^oversimplification]: Estamos conscientes de que esta afirmación es una simplificación exagerada. Los conocedores de Git dirían que una de las principales ventajas es que el software genera "punteros" a los cambios y que eso lo hace mas rápido y eficiente. Esta es una discusión que dejamos para otras instancias.

[^cmdLineNotation]: La notación estándar para documentar la línea de comando es que los argumentos ingresados por el usuario es antecedida por el símbolo peso `$`, mientras que el resto corresponde al *output* del sistema.
