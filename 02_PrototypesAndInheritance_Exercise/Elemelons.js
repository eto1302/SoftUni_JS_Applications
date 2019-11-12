function Solve(){
    class Melon{
        constructor(weight, melonSort){
            if(new.target === Melon){
                throw new TypeError("Abstract class cannot be instantiated directly");
            }
            this.weight = weight;
            this.melonSort = melonSort;
        }
    }
    
    class Watermelon extends Melon{
        constructor(weight, melonSort){
            super(weight, melonSort);
            this._elementIndex = this.weight * (String(this.melonSort).length);
            this.element = 'Water';
        }
    
        get elementIndex(){
            return this._elementIndex;
        }
    
        toString(){
            return `Element: ${this.element}\nSort: ${this.melonSort}\nElement Index: ${this.elementIndex}`;        
        }
    }
    
    class Airmelon extends Melon{
        constructor(weight, melonSort){
            super(weight, melonSort);
            this._elementIndex = this.weight * (String(this.melonSort).length);
            this.element = 'Air';
        }
    
        get elementIndex(){
            return this._elementIndex;
        }
    
        toString(){
            return `Element: ${this.element}\nSort: ${this.melonSort}\nElement Index: ${this.elementIndex}`;        
        }
    }
    
    class Firemelon extends Melon{
        constructor(weight, melonSort){
            super(weight, melonSort);
            this._elementIndex = this.weight * (String(this.melonSort).length);
            this.element = 'Fire';
        }
    
        get elementIndex(){
            return this._elementIndex;
        }
    
        toString(){
            return `Element: ${this.element}\nSort: ${this.melonSort}\nElement Index: ${this.elementIndex}`;        
        }
    }
    
    class Earthmelon extends Melon{
        constructor(weight, melonSort){
            super(weight, melonSort);
            this._elementIndex = this.weight * (String(this.melonSort).length);
            this.element = 'Earth';
        }
    
        get elementIndex(){
            return this._elementIndex;
        }
    
        toString(){
            return `Element: ${this.element}\nSort: ${this.melonSort}\nElement Index: ${this.elementIndex}`;        
        }
    }
    
    class Melolemonmelon extends Watermelon{
        constructor(weight, melonSort){
            super(weight, melonSort);        
        }
        morph(){
            if(this.element === 'Water') this.element = 'Fire';        
            else if(this.element === 'Fire') this.element = 'Earth';
            else if(this.element === 'Earth') this.element = 'Air';
            else if(this.element === 'Air') this.element = 'Water';
        }
    }

    return{
        Melon, 
        Watermelon,
        Earthmelon,
        Firemelon,
        Airmelon,
        Melolemonmelon
    }
}