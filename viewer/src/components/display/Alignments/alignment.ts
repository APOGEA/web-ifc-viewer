import {
  LineSegments,
  LineBasicMaterial,
  Vector2,
  BufferGeometry
} from 'three';
import { IfcComponent, Context } from '../../../base-types';

export class IfcAlignment extends IfcComponent {
  context: Context;

  private lineMaterial = new LineBasicMaterial({
    color: 0x888888
  });

  constructor(context: Context) {
    super(context);
    this.context = context;
  }

  set edgesMaterial(newMaterial: LineBasicMaterial) {
    this.lineMaterial = newMaterial;
  }

  toggleAlignment = (active: boolean) => {
    this.context.items.ifcModels.forEach((ifcModel) => {
      if (!active && ifcModel.userData.alignment) {
        ifcModel.remove(ifcModel.userData.alignment);
        return;
      }
      if (!ifcModel.userData.alignment)
        ifcModel.userData.alignment = this.constructEdges();
      ifcModel.add(ifcModel.userData.alignment);
    });
  };

  private constructEdges = () => {
    const points = [];
    const indices = [];

    points.push(new Vector2(0, 0));
    points.push(new Vector2(0, 10));
    points.push(new Vector2(20, 10));
    points.push(new Vector2(20, 0));

    for(let i = 1; i < 20; i++)
    {
      points.push(new Vector2(i, 0));
      points.push(new Vector2(i, 10));
    }

    indices.push(0, 1);
    indices.push(1, 2);
    indices.push(2, 3);
    indices.push(3, 0);

    for(let i = 1; i < 20; i++)
    {
      let id = (i-1) * 2;
      indices.push(4 + id, 4 + id + 1);
    }

    const geometry = new BufferGeometry().setFromPoints(points);
    geometry.setIndex(indices)

    return new LineSegments(geometry, this.lineMaterial);
  };
}