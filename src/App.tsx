import { useState } from 'react';
import styles from './App.module.css';
import poweredImage from './assets/powered.png';
import {levels, calculateImc, Level} from './helpers/imc';
import leftArrowImage from './assets/leftarrow.png'
import {GridItem} from './components/GridItem';
import { text } from 'stream/consumers';

const App = () => {
  const [heightField, setHeightField] = useState<number> (0);
  const [weightField, setWeightField] = useState<number> (0);
  const [toShow, setToShow] = useState<Level | null>(null);
  
  const handleCalculateButton = () => {
    if(heightField && weightField) {
      setToShow(calculateImc(heightField, weightField));
    }else {
      alert ('Digite todos os campos!')
    }
  }

  const handleBackButton = () => {
    setToShow(null);
    setHeightField(0);
    setWeightField(0);

  }
  
  
  return(
    <div className={styles.main}>
      <header>
        <div className={styles.headerContainer}>
          <img src={poweredImage} alt="" width={150} />
        </div>
      </header>
      <div className={styles.container}>
        <div className={styles.leftSide}>
          <h1>Calcule seu IMC</h1>
          <p>IMC é o cálculo da nossa massa corpórea, com ela identificamos se estamos bem ou mal com o nosso corpo.</p>
          <input 
          type="text"
          placeholder='Digite sua altura'
          value={heightField > 0 ? heightField : ''}
          onChange={e => setHeightField(parseFloat(e.target.value))}
          disabled={toShow ? true : false}
          />
           <input 
          type=""
          placeholder='Digite seu peso'
          value={weightField > 0 ? weightField : ''}
          onChange={e => setWeightField(parseFloat(e.target.value))}
          disabled={toShow ? true : false}
          />   

          <button onClick={handleCalculateButton} disabled={toShow ? true : false}>Calcular</button>
        
        </div>
        <div className={styles.rightSide}>
          {!toShow &&
            <div className={styles.grid}>
              {levels.map((item, key) => (
                <GridItem key={key} item={item}/>
              ))}
            </div>
          }
          {toShow &&
            <div className={styles.rightBig}>
              <div className={styles.rightArrow} onClick={handleBackButton}>
                <img src={leftArrowImage} alt="" width={25} />
              </div>
              <GridItem item={toShow} />
            </div> 
          }
        </div>
      </div>
    </div> 
  );
}
export default App;