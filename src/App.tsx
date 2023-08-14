import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact,
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { ellipse, imagesOutline, square, triangle } from 'ionicons/icons';
import Tab1 from './pages/Tab1';
import Tab2 from './pages/Tab2';
import Tab3 from './pages/Tab3';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import { useFilesystem } from '@capacitor-community/filesystem-react';
import { FilePicker } from '@capawesome/capacitor-file-picker';
import jsQR from 'jsqr';
import  PDFJS  from 'pdfjs-dist';

setupIonicReact();

const App: React.FC = () => {
  const { readFile } = useFilesystem();

  const handleGalleryClick = async () => {
    const result = await FilePicker.pickFiles({
      types: ['image/png', 'image/jpg', 'application/pdf'],
      multiple: false,
    });

  
    const file = result.files[0]
    if(file.mimeType && file.mimeType === 'application/pdf'){
      console.log('YAAY a pdf'); 

      const pdf = await PDFJS.getDocument({ data: file.blob }).promise;
  
  // Fetching the first page
  const page = await pdf.getPage(1);
  
  // Setting the desired output resolution
  const viewport = page.getViewport({ scale: 1 }); 

  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  canvas.width = viewport.width;
  canvas.height = viewport.height;



    }else if (file){
      console.log('NOT PDF!'); 
    }
  
};

  return (
    <IonApp>
      <IonReactRouter>
        <IonTabs>
          <IonRouterOutlet>
            <Route exact path="/tab1">
              <Tab1 />
            </Route>
            <Route exact path="/tab2">
              <Tab2 />
            </Route>
            <Route path="/tab3">
              <Tab3 />
            </Route>
            <Route exact path="/">
              <Redirect to="/tab1" />
            </Route>
          </IonRouterOutlet>
          <IonTabBar slot="bottom">
            <IonTabButton tab="tab1" href="/tab1">
              <IonIcon aria-hidden="true" icon={triangle} />
              <IonLabel>Tab 1</IonLabel>
            </IonTabButton>
            <IonTabButton tab="tab2" href="/tab2">
              <IonIcon aria-hidden="true" icon={ellipse} />
              <IonLabel>Tab 2</IonLabel>
            </IonTabButton>
            <IonTabButton tab="tab3" onClick={handleGalleryClick}>
              <IonIcon aria-hidden="true" icon={imagesOutline} />
              <IonLabel>Tab 3</IonLabel>
            </IonTabButton>
          </IonTabBar>
        </IonTabs>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
