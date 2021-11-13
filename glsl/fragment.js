const fragment = `
    varying vec2 vUv;
    uniform  int uName;
    uniform float uMultiple;
    uniform bool  uIsMod;
    uniform bool  uIsStep;
    uniform float uStepV;

    vec4 useFunc(float strength){
        float newStrength=strength;
        if(uIsMod){
            newStrength = mod(newStrength *10.0,1.0);
        }
        if(uIsStep){
            newStrength = step(uStepV,newStrength);
        } 

        return vec4(vec3(newStrength),1.0);
    }

    void main(){

        vec4 fragColor = vec4(1.0,1.0,1.0,1.0); 
        float strength =0.0;
        switch(uName){
            case 1:  
                fragColor = useFunc( vUv.x * uMultiple);
            break;
            case 2: 
                fragColor =  useFunc( vUv.y * uMultiple);
            break;
            case 3: 
                fragColor = vec4(vec2(vUv.xy*uMultiple),1.0,1.0);
            break;
            case 4: 
                
                strength = step(uStepV,mod(vUv.x*10.0,1.0));
                strength += step(uStepV,mod(vUv.y*10.0,1.0));
                fragColor = vec4(vec3(strength),1.0);
            break;
        } 
        gl_FragColor = fragColor;
    }

`;

export { fragment };
