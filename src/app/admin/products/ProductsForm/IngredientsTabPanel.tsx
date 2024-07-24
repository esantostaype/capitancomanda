import { FieldArray, Field } from 'formik';
import { Button } from '@/components';
import { useState, useRef, useEffect, Key } from 'react';
import { Product } from '@/interfaces';

type IngredientsTabPanelProps = {
  values: any;
  product: Product | undefined;
  branchId: string | undefined;
};

export const IngredientsTabPanel = ({
  values,
  product,
  branchId
}: IngredientsTabPanelProps) => {
  const [newIngredientIndex, setNewIngredientIndex] = useState<number | null>(null);
  const ingredientRefs = useRef<Array<HTMLInputElement | null>>([]);

  useEffect(() => {
    if (newIngredientIndex !== null && ingredientRefs.current[newIngredientIndex]) {
      ingredientRefs.current[newIngredientIndex]?.scrollIntoView({ behavior: 'smooth' });
      ingredientRefs.current[newIngredientIndex]?.focus();
      setNewIngredientIndex(null);
    }
  }, [newIngredientIndex]);

  const removeEmptyOptions = (formValues: any): any => {
    const newIngredients = formValues.ingredients.filter((ingredient: any) => ingredient.name || ingredient.quantity);
    return {
      ...formValues,
      ingredients: newIngredients
    };
  };

  return (
    <div className="block__body__content isPage">
      <FieldArray name="ingredients">
        {({ remove, push }) => (
          <>
            <div className='form__options__header'>
              {product?.user.branchId === branchId && (
                <Button
                  text="Agregar Ingrediente"
                  ghost
                  size='small'
                  iconName='plus-small'
                  onClick={() => {
                    push({ name: '', quantity: null });
                    setNewIngredientIndex(values.ingredients.length);
                  }}
                />
              )}
              {values.ingredients.length === 0 && (
                <div className='form__options__null'>
                  <i className="fi fi-rr-empty-set"></i>
                  <span>Este producto no tiene ingredientes aun</span>
                </div>
              )}
            </div>
            {values.ingredients.length > 0 && (
              <div className='table__wrapper'>
                <table>
                  <thead>
                    <tr>
                      <th style={{ width: '240px' }}>Ingrediente</th>
                      <th style={{ width: '240px' }}>Cantidad</th>
                      <th>Unidad</th>
                      <th style={{ width: '30%' }}></th>
                    </tr>
                  </thead>
                  <tbody>
                    {values.ingredients.map((ingredient: { name: any; quantity: any; }, index: number) => (
                      <tr key={index}>
                        <td>
                          <Field
                            type="text"
                            name={`ingredients.${index}.name`}
                            placeholder="Ingresa el Ingrediente"
                            value={ingredient.name}
                            innerRef={(el: HTMLInputElement | null) => ingredientRefs.current[index] = el}
                          />
                        </td>
                        <td>
                          <Field
                            type="number"
                            name={`ingredients.${index}.quantity`}
                            placeholder="Ingresa la Cantidad"
                            value={ingredient.quantity}
                          />
                        </td>
                        <td>
                          Gr.
                        </td>
                        <td>
                          <div className="table__flex table__actions">
                            <Button
                              mode='error'
                              iconName='trash'
                              ghost
                              onClick={() => remove(index)}
                              size='small'
                              disabled={product?.user.branchId !== branchId}
                            />
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}
      </FieldArray>
    </div>
  );
};
