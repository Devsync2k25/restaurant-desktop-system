import React from 'react';
import MenuTable from '../components/MenuTable';

const RecipesPage: React.FC = () => {
  // Empty recipes array - client will add their own data
  const mockRecipes: any[] = [];

  const handleEdit = (recipe: any) => {
    console.log('Edit recipe:', recipe);
  };
  
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Recipe Management</h1>
      <MenuTable recipes={mockRecipes} onEdit={handleEdit} />
    </div>
  );
};

export default RecipesPage; 